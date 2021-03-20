import { createServer, plugins } from "restify";
import corsMiddleware from "restify-cors-middleware2";

import logger from "./middleware/logger";
import * as Item from "./controller/item";
import * as Achievement from "./controller/achievement";
import * as User from "./controller/user";
import * as History from "./controller/history";
import * as Area from "./controller/area";
import * as Dungeon from "./controller/dungeon";

const server = createServer();

const cors = corsMiddleware({
  origins: ["*"],
});

server.pre(cors.preflight);

// Plugins
server.use(
  cors.actual,
  plugins.acceptParser(server.acceptable),
  plugins.queryParser(),
  plugins.bodyParser(),
  logger,
);

// User
server.get("/users/:id", User.getByID);
server.get("/users/random", User.getRandom);

server.get("/users/:id/items", User.getItemsByUserID);

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
// server.get("/standings");

// @TODO Announcements
// server.get("/announcements");

// @TODO Notifications
// server.post("/notifications");

// Areas
server.get("/areas", Area.getAll);
server.get("/areas/:areaID", Area.getByID);
// server.get(
//   "/areas/images/*",
//   plugins.serveStaticFiles(
//     "static/areas",
//   ),
// );

// Dungeons
server.get("/dungeons", Dungeon.getAll);
server.get("/dungeons/:id", Dungeon.getByID);

// @TODO Products
// server.get("/products");
// server.put("/products/:id");

// RUN
server.listen(3001, () => {
  console.log(`🦕 API Server running at ${server.url} 🦕`);
});
