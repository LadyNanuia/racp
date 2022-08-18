import * as zod from "zod";
import { createTagFactory } from "../../../lib/createTagFactory";
import { createSearchTypes } from "../search/types";
import { createRpcDefinition } from "../../util/rpc";
import { UserAccessLevel } from "../auth/types";
import { itemIdType, itemFilter, itemType } from "./types";

const tag = createTagFactory("Item");

export const itemDefinition = createRpcDefinition({
  tagTypes: [tag.type],
  entries: (builder) =>
    builder
      .query("searchItems", ...createSearchTypes(itemType, itemFilter.type))
      .query("getItem", itemIdType, itemType)
      .query("countItemInfo", zod.void(), zod.number(), {
        tags: ["ITEM_INFO"],
        auth: UserAccessLevel.Admin,
      })
      .fileUpload("uploadItemInfo", zod.boolean(), {
        tags: ["ITEM_INFO"],
        auth: UserAccessLevel.Admin,
      }),
});
