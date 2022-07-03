/*
 * DO NOT EDIT THIS FILE MANUALLY
 * This file was generated by a tool.
 * Rerun yarn codegen to regenerate this file.
 */
export interface AccRegNumEntity {
  account_id?: number;
  index?: number;
  key?: string;
  value?: string;
}
export interface AccRegStrEntity {
  account_id?: number;
  index?: number;
  key?: string;
  value?: string;
}
export interface AchievementEntity {
  char_id?: number;
  completed: Date | null;
  count1?: number;
  count10?: number;
  count2?: number;
  count3?: number;
  count4?: number;
  count5?: number;
  count6?: number;
  count7?: number;
  count8?: number;
  count9?: number;
  id: string;
  rewarded: Date | null;
}
export interface AuctionEntity {
  attribute?: number;
  auction_id?: string;
  buyer_id?: number;
  buyer_name?: string;
  buynow?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  enchantgrade?: number;
  hours?: number;
  item_name?: string;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  price?: number;
  refine?: number;
  seller_id?: number;
  seller_name?: string;
  timestamp?: number;
  type?: number;
  unique_id?: string;
}
export interface BarterEntity {
  amount: number;
  index: number;
  name?: string;
}
export interface BonusScriptEntity {
  char_id: number;
  flag?: number;
  icon?: number;
  script: string;
  tick?: string;
  type?: number;
}
export interface BuyingstoreItemsEntity {
  amount: number;
  buyingstore_id: number;
  index: number;
  item_id: number;
  price: number;
}
export interface BuyingstoresEntity {
  account_id: number;
  autotrade: number;
  body_direction?: string;
  char_id: number;
  head_direction?: string;
  id: number;
  limit: number;
  map: string;
  sex?: number;
  sit?: string;
  title: string;
  x: number;
  y: number;
}
export interface CartInventoryEntity {
  amount?: number;
  attribute?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  char_id?: number;
  enchantgrade?: number;
  equip?: number;
  expire_time?: number;
  id?: number;
  identify?: number;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  unique_id?: string;
}
export interface CharEntity {
  account_id?: number;
  agi?: number;
  ap?: number;
  base_exp?: string;
  base_level?: number;
  body?: number;
  char_id?: number;
  char_num?: number;
  child?: number;
  clan_id?: number;
  class?: number;
  clothes_color?: number;
  con?: number;
  crt?: number;
  delete_date?: number;
  dex?: number;
  elemental_id?: number;
  fame?: number;
  father?: number;
  font?: number;
  guild_id?: number;
  hair?: number;
  hair_color?: number;
  head_bottom?: number;
  head_mid?: number;
  head_top?: number;
  homun_id?: number;
  hotkey_rowshift?: number;
  hotkey_rowshift2?: number;
  hp?: number;
  int?: number;
  inventory_slots?: number;
  job_exp?: string;
  job_level?: number;
  karma?: number;
  last_login: Date | null;
  last_map?: string;
  last_x?: number;
  last_y?: number;
  luk?: number;
  manner?: number;
  max_ap?: number;
  max_hp?: number;
  max_sp?: number;
  mother?: number;
  moves?: number;
  name?: string;
  online?: number;
  option?: number;
  partner_id?: number;
  party_id?: number;
  pet_id?: number;
  pow?: number;
  rename?: number;
  robe?: number;
  save_map?: string;
  save_x?: number;
  save_y?: number;
  sex: number;
  shield?: number;
  show_equip?: number;
  skill_point?: number;
  sp?: number;
  spl?: number;
  sta?: number;
  status_point?: number;
  str?: number;
  title_id?: number;
  trait_point?: number;
  unban_time?: number;
  uniqueitem_counter?: number;
  vit?: number;
  weapon?: number;
  wis?: number;
  zeny?: number;
}
export interface CharRegNumEntity {
  char_id?: number;
  index?: number;
  key?: string;
  value?: string;
}
export interface CharRegStrEntity {
  char_id?: number;
  index?: number;
  key?: string;
  value?: string;
}
export interface CharlogEntity {
  account_id?: number;
  agi?: number;
  char_msg?: string;
  char_num?: number;
  dex?: number;
  hair?: number;
  hair_color?: number;
  id?: string;
  int?: number;
  luk?: number;
  name?: string;
  str?: number;
  time: Date;
  vit?: number;
}
export interface ClanEntity {
  clan_id?: number;
  mapname?: string;
  master?: string;
  max_member?: number;
  name?: string;
}
export interface ClanAllianceEntity {
  alliance_id?: number;
  clan_id?: number;
  name?: string;
  opposition?: number;
}
export interface DbRouletteEntity {
  amount?: number;
  flag?: number;
  index?: number;
  item_id: number;
  level: number;
}
export interface ElementalEntity {
  aspd?: number;
  atk1?: number;
  atk2?: number;
  char_id: number;
  class?: number;
  def?: number;
  ele_id?: number;
  flee?: number;
  hit?: number;
  hp?: number;
  life_time?: string;
  matk?: number;
  max_hp?: number;
  max_sp?: number;
  mdef?: number;
  mode?: number;
  sp?: number;
}
export interface FriendsEntity {
  char_id?: number;
  friend_id?: number;
}
export interface GlobalAccRegNumEntity {
  account_id?: number;
  index?: number;
  key?: string;
  value?: string;
}
export interface GlobalAccRegStrEntity {
  account_id?: number;
  index?: number;
  key?: string;
  value?: string;
}
export interface GuildEntity {
  average_lv?: number;
  char_id?: number;
  connect_member?: number;
  emblem_data: unknown | null;
  emblem_id?: number;
  emblem_len?: number;
  exp?: string;
  guild_id?: number;
  guild_lv?: number;
  last_master_change: Date | null;
  master?: string;
  max_member?: number;
  mes1?: string;
  mes2?: string;
  name?: string;
  next_exp?: string;
  skill_point?: number;
}
export interface GuildAllianceEntity {
  alliance_id?: number;
  guild_id?: number;
  name?: string;
  opposition?: number;
}
export interface GuildCastleEntity {
  castle_id?: number;
  createTime?: number;
  defense?: number;
  economy?: number;
  guild_id?: number;
  nextTime?: number;
  payTime?: number;
  triggerD?: number;
  triggerE?: number;
  visibleC?: number;
  visibleG0?: number;
  visibleG1?: number;
  visibleG2?: number;
  visibleG3?: number;
  visibleG4?: number;
  visibleG5?: number;
  visibleG6?: number;
  visibleG7?: number;
}
export interface GuildExpulsionEntity {
  account_id?: number;
  guild_id?: number;
  mes?: string;
  name?: string;
}
export interface GuildMemberEntity {
  char_id?: number;
  exp?: string;
  guild_id?: number;
  position?: number;
}
export interface GuildPositionEntity {
  exp_mode?: number;
  guild_id?: number;
  mode?: number;
  name?: string;
  position?: number;
}
export interface GuildSkillEntity {
  guild_id?: number;
  id?: number;
  lv?: number;
}
export interface GuildStorageEntity {
  amount?: number;
  attribute?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  enchantgrade?: number;
  equip?: number;
  expire_time?: number;
  guild_id?: number;
  id?: number;
  identify?: number;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  unique_id?: string;
}
export interface GuildStorageLogEntity {
  amount?: number;
  attribute?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  char_id?: number;
  enchantgrade?: number;
  expire_time?: number;
  guild_id?: number;
  id?: number;
  identify?: number;
  name?: string;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  time: Date;
  unique_id?: string;
}
export interface HomunculusEntity {
  agi?: number;
  alive?: number;
  autofeed?: number;
  char_id: number;
  class?: number;
  dex?: number;
  exp?: string;
  homun_id?: number;
  hp?: number;
  hunger?: number;
  int?: number;
  intimacy?: number;
  level?: number;
  luk?: number;
  max_hp?: number;
  max_sp?: number;
  name?: string;
  prev_class?: number;
  rename_flag?: number;
  skill_point?: number;
  sp?: number;
  str?: number;
  vaporize?: number;
  vit?: number;
}
export interface HotkeyEntity {
  char_id: number;
  hotkey: number;
  itemskill_id?: number;
  skill_lvl?: number;
  type?: number;
}
export interface InterlogEntity {
  id?: number;
  log?: string;
  time: Date;
}
export interface InventoryEntity {
  amount?: number;
  attribute?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  char_id?: number;
  enchantgrade?: number;
  equip?: number;
  equip_switch?: number;
  expire_time?: number;
  favorite?: number;
  id?: number;
  identify?: number;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  unique_id?: string;
}
export interface IpbanlistEntity {
  btime: Date;
  list?: string;
  reason?: string;
  rtime: Date;
}
export interface LoginEntity {
  account_id?: number;
  birthdate: Date | null;
  character_slots?: number;
  email?: string;
  expiration_time?: number;
  group_id?: number;
  last_ip?: string;
  lastlogin: Date | null;
  logincount?: number;
  old_group?: number;
  pincode?: string;
  pincode_change?: number;
  sex?: number;
  state?: number;
  unban_time?: number;
  user_pass?: string;
  userid?: string;
  vip_time?: number;
  web_auth_token: string | null;
  web_auth_token_enabled?: number;
}
export interface MailEntity {
  dest_id?: number;
  dest_name?: string;
  id?: string;
  message?: string;
  send_id?: number;
  send_name?: string;
  status?: number;
  time?: number;
  title?: string;
  type?: number;
  zeny?: number;
}
export interface MailAttachmentsEntity {
  amount?: number;
  attribute?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  enchantgrade?: number;
  id?: string;
  identify?: number;
  index?: number;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  unique_id?: string;
}
export interface MapregEntity {
  index?: number;
  value: string;
  varname: string;
}
export interface MarketEntity {
  amount: number;
  flag?: number;
  name?: string;
  nameid: number;
  price: number;
}
export interface MemoEntity {
  char_id?: number;
  map?: string;
  memo_id?: number;
  x?: number;
  y?: number;
}
export interface MercenaryEntity {
  char_id: number;
  class?: number;
  hp?: number;
  kill_counter: number;
  life_time?: string;
  mer_id?: number;
  sp?: number;
}
export interface MercenaryOwnerEntity {
  arch_calls?: number;
  arch_faith?: number;
  char_id: number;
  merc_id?: number;
  spear_calls?: number;
  spear_faith?: number;
  sword_calls?: number;
  sword_faith?: number;
}
export interface PartyEntity {
  exp?: number;
  item?: number;
  leader_char?: number;
  leader_id?: number;
  name?: string;
  party_id?: number;
}
export interface PetEntity {
  account_id?: number;
  autofeed?: number;
  char_id?: number;
  class?: number;
  egg_id?: number;
  equip?: number;
  hungry?: number;
  incubate?: number;
  intimate?: number;
  level?: number;
  name?: string;
  pet_id?: number;
  rename_flag?: number;
}
export interface QuestEntity {
  char_id?: number;
  count1?: number;
  count2?: number;
  count3?: number;
  quest_id: number;
  state?: number;
  time?: number;
}
export interface SalesEntity {
  amount: number;
  end: Date;
  nameid: number;
  start: Date;
}
export interface ScDataEntity {
  account_id: number;
  char_id: number;
  tick: string;
  type: number;
  val1?: number;
  val2?: number;
  val3?: number;
  val4?: number;
}
export interface SkillEntity {
  char_id?: number;
  flag?: number;
  id?: number;
  lv?: number;
}
export interface SkillHomunculusEntity {
  homun_id: number;
  id: number;
  lv: number;
}
export interface SkillcooldownEntity {
  account_id: number;
  char_id: number;
  skill?: number;
  tick: string;
}
export interface StorageEntity {
  account_id?: number;
  amount?: number;
  attribute?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  enchantgrade?: number;
  equip?: number;
  expire_time?: number;
  id?: number;
  identify?: number;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  unique_id?: string;
}
export interface VendingItemsEntity {
  amount: number;
  cartinventory_id: number;
  index: number;
  price: number;
  vending_id: number;
}
export interface VendingsEntity {
  account_id: number;
  autotrade: number;
  body_direction?: string;
  char_id: number;
  head_direction?: string;
  id: number;
  map: string;
  sex?: number;
  sit?: string;
  title: string;
  x: number;
  y: number;
}
export interface AtcommandlogEntity {
  account_id?: number;
  atcommand_date: Date;
  atcommand_id?: number;
  char_id?: number;
  char_name?: string;
  command?: string;
  map?: string;
}
export interface BranchlogEntity {
  account_id?: number;
  branch_date: Date;
  branch_id?: number;
  char_id?: number;
  char_name?: string;
  map?: string;
}
export interface CashlogEntity {
  amount?: number;
  cash_type?: number;
  char_id?: number;
  id?: number;
  map?: string;
  time: Date;
  type?: number;
}
export interface ChatlogEntity {
  dst_charname?: string;
  id?: string;
  message?: string;
  src_accountid?: number;
  src_charid?: number;
  src_map?: string;
  src_map_x?: number;
  src_map_y?: number;
  time: Date;
  type?: number;
  type_id?: number;
}
export interface FeedinglogEntity {
  char_id: number;
  id?: number;
  intimacy: number;
  item_id: number;
  map: string;
  target_class: number;
  target_id: number;
  time: Date;
  type: number;
  x: number;
  y: number;
}
export interface LoginlogEntity {
  ip?: string;
  log?: string;
  rcode?: number;
  time: Date;
  user?: string;
}
export interface MvplogEntity {
  kill_char_id?: number;
  map?: string;
  monster_id?: number;
  mvp_date: Date;
  mvp_id?: number;
  mvpexp?: string;
  prize?: number;
}
export interface NpclogEntity {
  account_id?: number;
  char_id?: number;
  char_name?: string;
  map?: string;
  mes?: string;
  npc_date: Date;
  npc_id?: number;
}
export interface PicklogEntity {
  amount?: number;
  bound?: number;
  card0?: number;
  card1?: number;
  card2?: number;
  card3?: number;
  char_id?: number;
  enchantgrade?: number;
  id?: number;
  map?: string;
  nameid?: number;
  option_id0?: number;
  option_id1?: number;
  option_id2?: number;
  option_id3?: number;
  option_id4?: number;
  option_parm0?: number;
  option_parm1?: number;
  option_parm2?: number;
  option_parm3?: number;
  option_parm4?: number;
  option_val0?: number;
  option_val1?: number;
  option_val2?: number;
  option_val3?: number;
  option_val4?: number;
  refine?: number;
  time: Date;
  type?: number;
  unique_id?: string;
}
export interface ZenylogEntity {
  amount?: number;
  char_id?: number;
  id?: number;
  map?: string;
  src_id?: number;
  time: Date;
  type?: number;
}
