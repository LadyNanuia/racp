import { Stack } from "@mui/material";
import { DataGrid, DataGridQueryFn } from "../components/DataGrid";
import { Item, ItemFilter } from "../../api/services/item/types";
import { useSearchItemsQuery } from "../state/client";
import { router } from "../router";
import { Link } from "../components/Link";

export const ItemGrid = DataGrid.define<Item, ItemFilter, Item["Id"]>({
  // Without assertion typescript yields possibly infinite error
  query: useSearchItemsQuery as unknown as DataGridQueryFn<Item, ItemFilter>,
  id: (item) => item.Id,
  columns: {
    Name: {
      renderCell({ row: item }) {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <img src={item.ImageUrl} alt="" width={32} />
            <Link to={router.item().view({ id: item.Id })}>{item.Name}</Link>
          </Stack>
        );
      },
    },
    Buy: "Buy",
    Sell: "Sell",
    Weight: "Weight",
    Attack: "Atk",
    MagicAttack: "MAtk",
    Defense: "Def",
    EquipLevelMin: "Min Level",
    EquipLevelMax: "Max Level",
    Slots: "Slots",
  },
});