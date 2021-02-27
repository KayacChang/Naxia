import { createServer, plugins } from "restify";

import logger from "./middleware/logger";
import * as Item from "./controller/item";

const server = createServer({
  name: "item service",
  version: "1.0.0",
});

server.use(
  plugins.acceptParser(server.acceptable),
  plugins.queryParser(),
  plugins.bodyParser(),
  logger,
);

server.get("/items", Item.get);

server.listen(8080, () => {
  console.log(`🦕 ${server.name} running at ${server.url} 🦕`);
});
