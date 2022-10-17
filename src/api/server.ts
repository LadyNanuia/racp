import * as http from "http";
import * as path from "path";
import * as express from "express";
import cors = require("cors");
import { Request as JWTRequest } from "express-jwt";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as morgan from "morgan";
import { createFileStore } from "../lib/fs/createFileStore";
import { createLogger } from "../lib/logger";
import { createPublicFileLinker } from "../lib/fs/createPublicFileLinker";
import { createImageFormatter } from "../lib/image/createImageFormatter";
import { createEllipsisLogFn } from "../lib/createEllipsisLogFn";
import { readCliArgs } from "../lib/cli";
import { createYamlDriver } from "./rathena/YamlDriver";
import { createDatabaseDriver } from "./rathena/DatabaseDriver";
import {
  AuthenticatorPayload,
  createAuthenticator,
} from "./services/user/util/Authenticator";
import { createUserService } from "./services/user/service";
import { createUtilService } from "./services/util/service";
import { createItemService } from "./services/item/service";
import { options } from "./options";
import { createMonsterService } from "./services/monster/service";
import { createScriptDriver, ScriptRepository } from "./rathena/ScriptDriver";
import { createMetaService } from "./services/meta/service";
import { createItemRepository } from "./services/item/repository";
import { createMonsterRepository } from "./services/monster/repository";
import { createMapService } from "./services/map/service";
import { createMapRepository } from "./services/map/repository";
import { createUserRepository } from "./services/user/repository";
import { timeColor } from "./common/timeColor";
import { ApiRouter, createApiRouter } from "./router";
import { createDropRepository } from "./services/drop/repository";
import { createDropService } from "./services/drop/service";
import { createVendorService } from "./services/vendor/service";
import { createShopService } from "./services/shop/service";
import { createShopRepository } from "./services/shop/repository";
import { createNpcRepository } from "./services/npc/repository";
import { createNpcService } from "./services/npc/service";
import { createAdminSettingsService } from "./services/settings/service";
import { createDonationService } from "./services/donation/service";
import { createAdminSettingsRepository } from "./services/settings/repository";
import { createTxtDriver } from "./rathena/TxtDriver";
import { createResourceManager } from "./resources";

const args = readCliArgs(options);
const logger = createLogger(
  {
    verbose: console.log,
    truncated: createEllipsisLogFn(process.stdout),
  }[args.log],
  { timeColor }
);

const app = express();
const txt = createTxtDriver({ ...args, logger });
const auth = createAuthenticator({ secret: args.jwtSecret, ...args });
const yaml = createYamlDriver({ ...args, logger });
const db = createDatabaseDriver({ ...args, logger });
const files = createFileStore(
  path.join(process.cwd(), args.dataFolder),
  logger
);
const script = createScriptDriver(new ScriptRepository({ ...args, logger }));
const formatter = createImageFormatter({ extension: ".png", quality: 70 });
const linker = createPublicFileLinker({
  directory: path.join(process.cwd(), args.publicFolder),
  hostname: args.hostname,
  port: args.apiPort,
});

const resourceManager = createResourceManager({ logger, ...args });
const resources = resourceManager.create;

let router: ApiRouter;

// prettier-ignore
{
  const user = createUserRepository({ resources, ...args });
  const items = createItemRepository({ ...args, txt, yaml, files, formatter, linker, logger, });
  const monsters = createMonsterRepository({ ...args, yaml, script, formatter, linker, logger, });
  const maps = createMapRepository({ files, linker, formatter, getSpawns: monsters.getSpawns, script, logger, });
  const npcs = createNpcRepository({ script, logger });
  const drops = createDropRepository({ items, monsters, logger });
  const shops = createShopRepository({ script, logger, getItems: items.getItems, });
  const settings = createAdminSettingsRepository(files);

  // TODO wait for all repositories to be ready
  const readyPromise = Promise.resolve(true);

  router = createApiRouter({
    util: createUtilService(() => readyPromise),
    user: createUserService({ db, user, sign: auth.sign, ...args }),
    item: createItemService(items),
    monster: createMonsterService({ db, repo: monsters }),
    drop: createDropService(drops),
    vendor: createVendorService({ db, items }),
    shop: createShopService(shops),
    npc: createNpcService(npcs),
    map: createMapService(maps),
    meta: createMetaService({ items, monsters }),
    settings: createAdminSettingsService(settings),
    donation: createDonationService({
      db,
      env: args.donationEnvironment,
      settings,
      items,
      logger,
    }),
  })
}

app.use(auth.middleware);
app.use(cors());
app.use(express.static(linker.directory));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  trpcExpress.createExpressMiddleware({
    onError({ error, path }) {
      logger
        .chain("trpc")
        .error(`/${path}`, error.name, `${error.message}: ${error.stack}`);
    },
    router,
    createContext: ({ req }: { req: JWTRequest<AuthenticatorPayload> }) => ({
      auth: req.auth,
      exposeInternalErrors: args.exposeInternalErrors,
    }),
  })
);

http.createServer(app).listen(args.apiPort, "0.0.0.0", () => {
  logger.log(`API is running on port ${args.apiPort}`);
});
