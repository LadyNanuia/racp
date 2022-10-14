import * as zod from "zod";
import { ZodType } from "zod";

export type Currency = NominalString<"Currency">;
export const currencyType = zod.string() as ZodType<Currency>;

export type Money = zod.infer<typeof moneyType>;
export const moneyType = zod.object({
  value: zod.number(),
  currency: currencyType,
});

export type ZenyColor = zod.infer<typeof zenyColorType>;
export const zenyColorType = zod.tuple([zod.number(), zod.string()]);

export type PaypalSettings = zod.infer<typeof paypalSettingsType>;
export const paypalSettingsType = zod.object({
  merchantId: zod.string(),
  clientId: zod.string(),
  clientSecret: zod.string(),
});

export const donationSettingsType = zod.object({
  enabled: zod.boolean(),
  defaultAmount: zod.number(),
  exchangeRate: zod.number(),
  currency: currencyType,
  presentation: zod.string(),
  accRegNumKey: zod.string(),
  paypal: paypalSettingsType,
});

export type AdminSettings = zod.infer<typeof adminSettingsType>;
export const adminSettingsType = zod.object({
  pageTitle: zod.string(),
  zenyColors: zod.object({
    // One for each theme mode
    dark: zod.array(zenyColorType),
    light: zod.array(zenyColorType),
  }),
  donations: donationSettingsType,
});

export type AdminPublicSettings = zod.infer<typeof adminPublicSettingsType>;
export const adminPublicSettingsType = zod.object({
  ...adminSettingsType.shape,
  donations: zod.object({
    ...donationSettingsType.shape,
    paypal: paypalSettingsType.omit({ clientSecret: true }),
  }),
});
