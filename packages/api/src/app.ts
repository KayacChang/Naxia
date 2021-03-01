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

// @TODO User Items
server.get("/users/:id/items");
// @TODO User Messages
server.get("/users/:id/messages");
// @TODO User Achievements
server.get("/users/:id/achievements");

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

// History query: userID
server.get("/history", History.get);

// @TODO Standings
server.get("/standings");

// @TODO Announcements
server.get("/announcements");

// @TODO Notifications
server.post("/notifications");

// @TODO Areas
server.get("/areas");
server.get("/areas/:areaID");
server.get(
  "/areas/images/*",
  plugins.serveStaticFiles(
    "static/areas",
  ),
);

// @TODO Products
server.get("/products");
server.put("/products/:id");

// @TODO Dungeons
server.get("/areas/:areaID/dungeons");
server.get("/areas/:areaID/dungeons/:dungeonID");

// RUN
server.listen(3001, () => {
  console.log(`🦕 API Server running at ${server.url} 🦕`);
});
