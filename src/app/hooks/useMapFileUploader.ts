import { flatten, pick } from "lodash";
import { cropSurroundingColors, RGB } from "../../lib/cropSurroundingColors";
import {
  useUpdateMapBoundsMutation,
  useUploadMapImagesMutation,
  useUploadMapInfoMutation,
} from "../state/client";
import { fromBrowserFile } from "../../lib/rpc/RpcFile";
import { GRF } from "../../lib/grf/types/GRF";
import { MapBounds, MapBoundsRegistry } from "../../api/services/map/types";
import { GAT } from "../../lib/grf/types/GAT";
import { readFileStream } from "../../lib/grf/readFileStream";
import { usePromiseTracker } from "./usePromiseTracker";

export function useMapFileUploader({
  cropColor = [255, 0, 255], // Magenta
}: {
  cropColor?: RGB;
} = {}) {
  const [uploadMapImages, imageUpload] = useUploadMapImagesMutation();
  const [uploadMapInfo, infoUpload] = useUploadMapInfoMutation();
  const [updateMapBounds, boundsUpdate] = useUpdateMapBoundsMutation();
  const tracker = usePromiseTracker();

  const parseError =
    infoUpload.data?.length === 0
      ? { message: "Invalid lub file." }
      : undefined;

  const error =
    imageUpload.error || infoUpload.error || parseError || boundsUpdate.error;

  async function upload(_files: readonly File[]) {
    tracker.reset();

    const files = _files.slice();
    const grfFiles = files.filter((file) => file.name.endsWith(".grf"));
    const grfObjects = await tracker.track(
      "Initializing GRF loaders",
      grfFiles.map((file) => () => new GRF(readFileStream, file).load())
    );

    const filesFromGRF = flatten(
      await tracker.track(
        "Unpacking GRF files",
        flatten(grfObjects.map(unpackGATAndImageFiles))
      )
    );

    // Add any relevant files found
    files.push(...filesFromGRF);

    const lubFiles = files.filter((file) => file.name.endsWith(".lub"));
    const gatFiles = files.filter((file) => file.name.endsWith(".gat"));
    const imageFiles = files.filter((file) => isImage(file.name));

    if (lubFiles.length) {
      tracker
        .track(
          "Loading lub file",
          lubFiles.map((file) => () => fromBrowserFile(file))
        )
        .then((files) =>
          tracker.track(`Uploading lub files`, [() => uploadMapInfo(files)])
        );
    }

    if (gatFiles.length) {
      const gatObjects = await tracker.track(
        "Reading map bounds from GAT files",
        gatFiles.map((file) => () => new GAT(readFileStream, file).load())
      );

      const registry = createMapBoundsRegistry(gatFiles, gatObjects);
      tracker.track(`Uploading map bounds`, [() => updateMapBounds(registry)]);
    }

    if (imageFiles.length) {
      const cropped = await tracker.track(
        `Cropping map images`,
        imageFiles.map((file) => () => cropMapImage(file))
      );
      const rpcFiles = await tracker.track(
        `Preparing map images for upload`,
        cropped.map((file) => () => fromBrowserFile(file))
      );

      tracker.track(
        `Uploading map images`,
        rpcFiles.map((file) => () => uploadMapImages([file]))
      );
    }
  }

  const isImage = (fileName: string) =>
    imageExtensions.some((ext) => fileName.endsWith(ext));

  async function cropMapImage(file: File) {
    return cropSurroundingColors(file, [cropColor]);
  }

  return {
    ...pick(tracker, "isPending", "tasks", "progress"),
    upload,
    error,
    fileExtensions: [...imageExtensions, ".lub", ".gat", ".grf"],
  };
}

const fileNameToMapName = (filename: string) =>
  /([^/\\]+)\.\w+$/.exec(filename)?.[1] ?? "";

function unpackGATAndImageFiles<Stream>(grf: GRF<Stream>) {
  const gatFilePathRegex = /^data\\(.*)\.gat$/;

  return Array.from(grf.files.keys())
    .filter((file) => gatFilePathRegex.test(file))
    .map((gatFilePath) => async () => {
      const out: File[] = [];

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mapName = fileNameToMapName(gatFilePath)!;
      const imageFilePath = `data\\texture\\à¯àúàîåíæäàì½º\\map\\${mapName}.bmp`;

      const [grfImageFile, grfGatFile] = await Promise.all([
        grf.getEntry(imageFilePath),
        grf.getEntry(gatFilePath),
      ]);

      if (grfGatFile.data) {
        out.push(
          new File([grfGatFile.data], `${mapName}.gat`, {
            type: "application/gat",
          })
        );
      }

      if (grfImageFile.data) {
        out.push(
          new File([grfImageFile.data], `${mapName}.bmp`, {
            type: "image/bmp",
          })
        );
      }

      return out;
    });
}

function createMapBoundsRegistry(files: File[], bounds: MapBounds[]) {
  return bounds.reduce(
    (registry: MapBoundsRegistry, bounds, index) => ({
      ...registry,
      [fileNameToMapName(files[index].name)]: bounds,
    }),
    {}
  );
}

const imageExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".tga"];
