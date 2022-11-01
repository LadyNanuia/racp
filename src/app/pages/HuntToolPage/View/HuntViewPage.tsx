import { useStore } from "zustand";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Hunt } from "@prisma/client";
import { ContentCopy } from "@mui/icons-material";
import { Item } from "../../../../api/services/item/types";
import { ItemIdentifier } from "../../../components/ItemIdentifier";
import { trpc } from "../../../state/client";
import { SearchField } from "../../../components/SearchField";
import { CommonPageGrid } from "../../../components/CommonPageGrid";
import { TextField } from "../../../controls/TextField";
import { Select } from "../../../controls/Select";
import {
  huntEditorStore,
  KpxUnit,
  kpxUnits,
  useIsHuntOwner,
} from "../huntEditorStore";
import { Header } from "../../../layout/Header";
import { RouteComponentProps } from "../../../../lib/tsr/react/types";
import { EditableText } from "../../../components/EditableText";
import { LoadingPage } from "../../LoadingPage";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { authStore } from "../../../state/auth";
import { useHistory } from "../../../../lib/tsr/react/useHistory";
import { routes } from "../../../router";
import { Spaceless } from "../../../components/Spaceless";
import { HuntedItemGrid } from "./HuntedItemGrid";
import { HuntedMonsterGrid } from "./HuntedMonsterGrid";

export default function HuntViewPage({
  params: { id: huntId },
}: RouteComponentProps<{ id: Hunt["id"] }>) {
  const history = useHistory();
  const { profile } = useStore(authStore);
  const isSignedIn = !!profile;
  const addItem = trpc.hunt.addItem.useMutation();
  const copyHunt = trpc.hunt.copy.useMutation();
  const renameHunt = trpc.hunt.rename.useMutation();
  const { data: hunt, isLoading } = trpc.hunt.read.useQuery(huntId);
  const error = addItem.error || renameHunt.error || copyHunt.error;
  const isOwner = useIsHuntOwner(hunt);

  async function copyAndRedirect() {
    const copy = await copyHunt.mutateAsync(huntId);
    history.push(routes.tools.hunt.view.$({ id: copy.id }));
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!hunt) {
    return <Header title="Unknown hunt" />;
  }

  return (
    <>
      <Header
        sx={{ mb: { md: 5, xs: 3 } }}
        title={
          <>
            <EditableText
              value={hunt.name}
              enabled={isOwner}
              onChange={(name) => renameHunt.mutate({ id: huntId, name })}
              variant="h6"
            />
            {!isOwner && isSignedIn && (
              <Spaceless>
                <Tooltip title="Add a copy of this hunt to your account">
                  <IconButton
                    sx={{ transform: "translate(8px, -50%)" }}
                    onClick={copyAndRedirect}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Spaceless>
            )}
          </>
        }
      />

      {error && <ErrorMessage sx={{ mb: 2 }} error={error} />}

      {isOwner && (
        <SearchField<Item>
          sx={{ width: "100%", mb: 3 }}
          onSelected={([item]) => {
            if (item) {
              addItem.mutate({ huntId, itemId: item.Id });
            }
          }}
          useQuery={useItemSearchQuery}
          optionKey={(option) => option.Id}
          optionLabel={(option) => option.Name}
          renderOption={(option) => <ItemIdentifier item={option} />}
          startSearchingMessage="Enter the name of the item you want to hunt"
          noResultsText={(searchQuery) => `No items matching "${searchQuery}"`}
          label="Add an item to hunt"
        />
      )}

      {isOwner && <Settings />}

      <CommonPageGrid sx={{ flex: 1 }} pixelCutoff={1400} flexValues={[5, 3]}>
        <HuntedItemGrid items={hunt.items} />
        <HuntedMonsterGrid monsters={hunt.monsters} />
      </CommonPageGrid>
    </>
  );
}

function Settings() {
  const { dropChanceMultiplier, setDropChanceMultiplier, kpxUnit, setKpxUnit } =
    useStore(huntEditorStore);
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        mt: { xs: 3, md: 0 },
        position: { md: "absolute" },
        top: 0,
        right: 0,
      }}
    >
      <TextField
        type="number"
        label="Drop Rate Multiplier"
        value={dropChanceMultiplier}
        onChange={(value) => setDropChanceMultiplier(value)}
      />
      <Select<KpxUnit>
        label="Kill Scale"
        options={kpxUnits}
        value={kpxUnit}
        onChange={(newUnit) => (newUnit ? setKpxUnit(newUnit) : undefined)}
      />
    </Stack>
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