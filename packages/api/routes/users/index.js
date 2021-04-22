import user from "./user.js";
import items from "./items.js";

export default async function (fastify) {
  user(fastify);
  items(fastify);
}
