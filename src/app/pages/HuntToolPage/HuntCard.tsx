import { Add, Delete } from "@mui/icons-material";
import { ComponentProps } from "react";
import { CardActions, CardContent, IconButton, Tooltip } from "@mui/material";
import { Hunt } from "@prisma/client";
import { CardListItem } from "../../components/CardList";
import { Center } from "../../components/Center";
import { LinkButton } from "../../components/Link";
import { routes } from "../../router";
import { EditableText } from "../../components/EditableText";
import { ItemIdentifierByFilter } from "../../components/ItemIdentifier";
import { MonsterIdentifierByFilter } from "../../components/MonsterIdentifier";
import { trpc } from "../../state/client";

export function HuntCard({
  hunt,
  onDelete,
}: {
  hunt: Hunt;
  onDelete?: (hunt: Hunt) => void;
}) {
  const { mutate: renameHunt } = trpc.hunt.rename.useMutation();
  return (
    <CardListItem sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ flex: 1, pb: 0, overflow: "hidden" }}
        style={{ marginBottom: 2 }}
      >
        <EditableText
          value={hunt.name}
          onChange={(name) => renameHunt({ id: hunt.id, name })}
          sx={{ mb: 1 }}
          variant="h6"
        />
        <HuntSummary id={hunt.id} />
      </CardContent>
      <CardActions>
        <LinkButton
          to={routes.tools.hunt.view.$({ id: hunt.id })}
          sx={{ mr: "auto" }}
        >
          View
        </LinkButton>
        <Tooltip title={`Delete "${hunt.name}"`}>
          <IconButton onClick={() => onDelete?.(hunt)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </CardActions>
    </CardListItem>
  );
}

export function AddHuntCard({
  sx,
  ...props
}: ComponentProps<typeof CardListItem>) {
  return (
    <CardListItem sx={{ cursor: "pointer", ...sx }} {...props}>
      <Center>
        <Tooltip title="New hunt">
          <Add sx={{ fontSize: 96 }} />
        </Tooltip>
      </Center>
    </CardListItem>
  );
}

function HuntSummary({ id }: { id: Hunt["id"] }) {
  const { data: richHunt } = trpc.hunt.richHunt.useQuery(id);
  if (!richHunt) {
    return null;
  }
  const itemIds = richHunt.items.map((i) => i.itemId);
  const monsterIds = richHunt.monsters.map((m) => m.monsterId);
  const sx = { mb: 2 };
  return (
    <>
      {itemIds.map((itemId) => (
        <ItemIdentifierByFilter
          sx={sx}
          showLabelAsTooltip
          key={`item-${itemId}`}
          loader=""
          filter={{
            Id: { value: itemId, matcher: "=" },
          }}
        />
      ))}
      {monsterIds.map((monsterId) => (
        <MonsterIdentifierByFilter
          sx={sx}
          showLabelAsTooltip
          key={`monster-${monsterId}`}
          loader=""
          filter={{
            Id: { value: monsterId, matcher: "=" },
          }}
        />
      ))}
    </>
  );
}
