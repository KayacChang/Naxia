import Room from "../logic/room.js";

export default async function (fastify, opts) {
  fastify.get("/", { websocket: true }, async (connection) => {
    Room.join(connection);
  });
}
