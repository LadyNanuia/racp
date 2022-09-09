import { range } from "lodash";
import * as JDataView from "jdataview";
import { Loader } from "../Loader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SPR<Stream = any> extends Loader<Stream> {
  header = "";
  version = 0;
  frames: RGBABitmap[] = [];

  protected async loadImpl() {
    const view = await this.getDataView();

    this.header = view.getString(2);
    this.version = parseFloat(view.getBytes(2).reverse().join("."));

    let indexedBitmaps: IndexedBitmap[] = [];
    let rgbaBitmaps: RGBABitmap[] = [];

    switch (this.version) {
      case 1.0:
      case 1.1: {
        const frameCount = view.getUint16();
        indexedBitmaps = readIndexedBitmaps(view, frameCount);
        break;
      }
      case 2.0:
      case 2.1: {
        const rleEncoded = this.version > 2;
        const readIndexed = rleEncoded
          ? readIndexedBitmapsRLE
          : readIndexedBitmaps;
        const indexedFrameCount = view.getUint16();
        const rgbaFrameCount = view.getUint16();
        indexedBitmaps = readIndexed(view, indexedFrameCount);
        rgbaBitmaps = readRGBABitmaps(view, rgbaFrameCount);
        break;
      }
      default:
        throw new Error(`Unsupported version "${this.version}"`);
    }

    const palette = view.getBytes(1024);

    // Normalize all frames
    this.frames = [
      ...indexedBitmaps.map((bitmap) => applyPalette(bitmap, palette)),
      ...rgbaBitmaps,
    ];
  }
}

function applyPalette(
  { indexes, width, height }: IndexedBitmap,
  palette: ABGRPalette
): RGBABitmap {
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const index = indexes[x + y * width] * 4;
      const offset = (x + y * width) * 4;
      data[offset] = palette[index];
      data[offset + 1] = palette[index + 1];
      data[offset + 2] = palette[index + 2];
      data[offset + 3] = index ? 255 : 0;
    }
  }

  return {
    data,
    width,
    height,
  };
}

function readRGBABitmaps(view: JDataView, frameCount: number) {
  return range(frameCount).map((): RGBABitmap => {
    const width = view.getUint16();
    const height = view.getUint16();
    const data = new Uint8Array(view.getBytes(width * height * 4));
    return { data, width, height };
  });
}

function readIndexedBitmaps(view: JDataView, frameCount: number) {
  return range(frameCount).map((): IndexedBitmap => {
    const width = view.getUint16();
    const height = view.getUint16();
    const indexes = new Uint8Array(view.getBytes(width * height));
    return { indexes, width, height };
  });
}

function readIndexedBitmapsRLE(view: JDataView, frameCount: number) {
  return range(frameCount).map((): IndexedBitmap => {
    const width = view.getUint16();
    const height = view.getUint16();
    const indexes = new Uint8Array(width * height);
    const end = view.getUint16() + view.tell();
    let offset = 0;
    while (view.tell() < end) {
      const c = view.getBytes(1)[0];
      indexes[offset++] = c;

      if (!c) {
        const index = view.getBytes(1)[0];
        if (!index) {
          indexes[offset++] = index;
        } else {
          for (let j = 1; j < index; ++j) {
            indexes[offset++] = c;
          }
        }
      }
    }

    return { indexes, width, height };
  });
}

type ABGRPalette = number[];

interface IndexedBitmap {
  width: number;
  height: number;
  indexes: Uint8Array;
}

interface RGBABitmap {
  width: number;
  height: number;
  data: Uint8Array;
}
