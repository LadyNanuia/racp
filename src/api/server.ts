import * as http from "http";
import * as express from "express";
import cors = require("cors");
import { createRpcMiddlewareFactory } from "../lib/rpc/createRpcMiddleware";
import { configDefinition } from "./services/config/config.definition";
import { createConfigHandlers } from "./services/config/config.handlers";
import {
  createAccessValidator,
  createAuthenticator,
} from "./services/auth/Authenticator";
import { authDefinition } from "./services/auth/auth.definition";
import { createAuthHandlers } from "./services/auth/auth.handlers";
import { itemDefinition } from "./services/item/item.definition";
import { createItemHandlers } from "./services/item/item.handlers";
import { createRAES } from "./services/raes";
import { readCliArgs } from "./util/cli";
import { options } from "./options";
import { createRACFG } from "./services/racfg";
import { createRADB } from "./services/radb";

const args = readCliArgs(options);
const app = express();
const auth = createAuthenticator({ secret: args.jwtSecret, ...args });
const raes = createRAES(args);
const racfg = createRACFG(args.rAthenaPath);
const radb = createRADB(racfg);
const rpc = createRpcMiddlewareFactory(createAccessValidator);

app.use(auth.middleware);
app.use(cors());
app.use(rpc(configDefinition.entries, createConfigHandlers(racfg)));
app.use(rpc(itemDefinition.entries, createItemHandlers({ raes, ...args })));
app.use(
  rpc(authDefinition.entries, createAuthHandlers({ radb, raes, auth, ...args }))
);

http.createServer(app).listen(args.port, () => {
  console.log(`API is running on port ${args.port}`);
});
