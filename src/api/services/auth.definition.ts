import * as zod from "zod";
import { createRpcDefinitions } from "../../utils/rpc/createRpcDefinitions";

export type User = zod.infer<typeof user>;

const user = zod.object({
  id: zod.string(),
  username: zod.string(),
  passwordHash: zod.string(),
});

export type PublicUser = zod.infer<typeof publicUser>;

const publicUser = user.omit({ passwordHash: true });

export const authDefinition = createRpcDefinitions({
  login: {
    argument: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
    result: zod.object({ token: zod.string(), user: publicUser }),
    intent: "mutation",
  },
});