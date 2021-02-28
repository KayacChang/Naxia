import { createServer, plugins } from "restify";

import logger from "./middleware/logger";
import * as Item from "./controller/item";
import * as Achievement from "./controller/achievement";

const server = createServer({
  name: "item service",
  version: "1.0.0",
});

// Plugins
server.use(
  plugins.acceptParser(server.acceptable),
  plugins.queryParser(),
  plugins.bodyParser(),
  logger,
);

// Items
server.get("/items", Item.getAll);
server.get("/items/random", Item.getRandom);
server.get(
  "/items/images/*",
  plugins.serveStaticFiles(
    "static/items",
  ),
);

// Achievements
server.get("/achievements", Achievement.getAll);

// RUN
server.listen(8080, () => {
  console.log(`🦕 ${server.name} running at ${server.url} 🦕`);
});
