import { DataGrid, DataGridQueryFn } from "../components/DataGrid";
import { MapInfo, MapInfoFilter } from "../../api/services/map/types";
import { useSearchMapsQuery } from "../state/client";
import { router } from "../router";

export const MapGrid = DataGrid.define<MapInfo, MapInfoFilter, MapInfo["id"]>({
  // Without assertion typescript yields possibly infinite error
  query: useSearchMapsQuery as unknown as DataGridQueryFn<
    MapInfo,
    MapInfoFilter
  >,
  link: (id) => router.map().view({ id }),
  id: (map) => map.id,
  columns: {
    displayName: { headerName: "Name", width: 350 },
    id: true,
  },
});