import { createServer, plugins } from "restify";

import logger from "./middleware/logger";
import * as Item from "./controller/item";
import * as Achievement from "./controller/achievement";
import * as User from "./controller/user";
import * as History from "./controller/history";

const server = createServer();

// Plugins
server.use(
  plugins.acceptParser(server.acceptable),
  plugins.queryParser(),
  plugins.bodyParser(),
  logger,
);

// User
server.get("/users/:id", User.getByID);
server.get("/users/random", User.getRandom);

// Items
server.get("/items", Item.getAll);
server.get("/items/:id", Item.getByID);
server.get("/items/random", Item.getRandom);
server.get(
  "/items/images/*",
  plugins.serveStaticFiles(
    "static/items",
  ),
);

// Achievements
server.get("/achievements", Achievement.getAll);
server.get("/achievements/:id", Achievement.getByID);

// History
server.get("/history", History.get);

// RUN
server.listen(3001, () => {
  console.log(`🦕 API Server running at ${server.url} 🦕`);
});
