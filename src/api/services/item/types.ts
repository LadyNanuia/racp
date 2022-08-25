import * as zod from "zod";
import { matcher, toggleRecordType } from "../../util/matcher";
import { clientTextType } from "../../common/clientTextType";
import { createEntityFilter } from "../../../lib/zod/ZodMatcher";
import { itemScriptType } from "./util/itemScriptType";

export type Item = zod.infer<typeof itemType>;

export const itemIdType = zod.number();

// ItemInfo is a separate type because it's loaded separately from client data
export type ItemInfo = zod.infer<typeof itemInfoType>;
export const itemInfoType = zod.object({
  unidentifiedDisplayName: clientTextType,
  unidentifiedResourceName: clientTextType,
  unidentifiedDescriptionName: zod.array(clientTextType),
  identifiedDisplayName: clientTextType,
  identifiedResourceName: clientTextType,
  identifiedDescriptionName: zod.array(clientTextType),
  slotCount: zod.number(),
  ClassNum: zod.number(),
  costume: zod.boolean().optional(),
});

export const itemPostProcessType = zod.object({
  Buy: zod.number(),
  Sell: zod.number(),
  ScriptList: zod.array(zod.string()),
  NameList: zod.array(zod.string()),
  DescriptionList: zod.array(zod.string()),
  Elements: zod.array(zod.string()),
  Statuses: zod.array(zod.string()),
  Races: zod.array(zod.string()),
  DroppedBy: zod.array(zod.number()), // Monster ids
});

export const itemType = zod.object({
  Id: zod.number(),
  AegisName: zod.string(),
  Name: zod.string(),
  Type: zod.string().optional(),
  SubType: zod.string().optional(),
  Weight: zod.number().optional(),
  Attack: zod.number().optional(),
  MagicAttack: zod.number().optional(),
  Defense: zod.number().optional(),
  Range: zod.number().optional(),
  Slots: zod.number().optional(),
  Jobs: toggleRecordType,
  Classes: toggleRecordType,
  Gender: zod.string().optional(),
  Locations: toggleRecordType,
  WeaponLevel: zod.number().optional(),
  ArmorLevel: zod.number().optional(),
  EquipLevelMin: zod.number().optional(),
  EquipLevelMax: zod.number().optional(),
  Refineable: zod.boolean().optional(),
  View: zod.number().optional(),
  AliasName: zod.string().optional(),
  Flags: zod
    .object({
      BuyingStore: zod.boolean(),
      DeadBranch: zod.boolean(),
      Container: zod.boolean(),
      UniqueId: zod.boolean(),
      BindOnEquip: zod.boolean(),
      DropAnnounce: zod.boolean(),
      NoConsume: zod.boolean(),
      DropEffect: zod.string(),
    })
    .partial()
    .optional(),
  Delay: zod
    .object({
      Duration: zod.number(),
      Status: zod.string(),
    })
    .partial()
    .optional(),
  Stack: zod
    .object({
      Amount: zod.number(),
      Inventory: zod.boolean(),
      Cart: zod.boolean(),
      Storage: zod.boolean(),
      GuildStorage: zod.boolean(),
    })
    .partial()
    .optional(),
  NoUse: zod
    .object({
      Override: zod.number(),
      Sitting: zod.boolean(),
    })
    .partial()
    .optional(),
  Trade: zod
    .object({
      Override: zod.number(),
      NoDrop: zod.boolean(),
      NoTrade: zod.boolean(),
      TradePartner: zod.boolean(),
      NoSell: zod.boolean(),
      NoCart: zod.boolean(),
      NoStorage: zod.boolean(),
      NoGuildStorage: zod.boolean(),
      NoMail: zod.boolean(),
      NoAuction: zod.boolean(),
    })
    .partial()
    .optional(),
  Script: itemScriptType.optional(),
  EquipScript: itemScriptType.optional(),
  UnEquipScript: itemScriptType.optional(),
  Info: itemInfoType.optional(),
  ...itemPostProcessType.partial().shape,
});

export type ItemFilter = zod.infer<typeof itemFilter.type>;
export const itemFilter = createEntityFilter(matcher, itemType);
