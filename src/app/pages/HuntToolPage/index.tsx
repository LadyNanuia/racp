import { useEffect } from "react";
import { useStore } from "zustand";
import { Typography } from "@mui/material";
import { Item } from "../../../api/services/item/types";
import { Header } from "../../layout/Header";
import { ItemIdentifier } from "../../components/ItemIdentifier";
import { trpc } from "../../state/client";
import { SearchField } from "../../components/SearchField";
import { CommonPageGrid } from "../../components/CommonPageGrid";
import { HuntedItemGrid } from "./HuntedItemGrid";
import { huntStore } from "./huntStore";
import { HuntedMonsterGrid } from "./HuntedMonsterGrid";

export default function HuntToolPage() {
  const { session, normalizeSession, addItems } = useStore(huntStore);

  useEffect(normalizeSession, [session, normalizeSession]);

  return (
    <>
      <Header />
      <Typography paragraph>
        Here you can track the items you are hunting for.
      </Typography>
      <Typography paragraph>
        The tool will show you an estimate per item how long it will take to
        farm the amount you have specified. <br />
        It takes the drop rates and kill speeds for all monsters you have chosen
        into account and gives you a summarized estimate.
      </Typography>
      <Typography paragraph>
        Data is stored in your local browser storage, so you can safely leave
        this page and return to it later on the same device.
      </Typography>
      <SearchField<Item>
        sx={{ width: "100%" }}
        onSelected={(items) => addItems(items.map((item) => item.Id))}
        useQuery={useItemSearchQuery}
        optionKey={(option) => option.Id}
        optionLabel={(option) => option.Name}
        renderOption={(option) => <ItemIdentifier item={option} />}
        startSearchingMessage="Enter the name of the item you want to hunt"
        noResultsText={(searchQuery) => `No items matching "${searchQuery}"`}
        label="Add an item to hunt"
      />
      <CommonPageGrid
        sx={{ mt: 3, flex: 1 }}
        pixelCutoff={1400}
        flexValues={[2, 1]}
      >
        <HuntedItemGrid />
        <HuntedMonsterGrid />
      </CommonPageGrid>
    </>
  );
}

function useItemSearchQuery(inputValue: string) {
  const enabled = !!inputValue;
  const { data: { entities: items = [] } = {}, isLoading } =
    trpc.item.search.useQuery(
      {
        filter: {
          Name: { value: inputValue, matcher: "contains" },
        },
      },
      { enabled }
    );
  return { data: items, isLoading: enabled && isLoading };
}
