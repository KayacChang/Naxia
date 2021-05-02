import fp from "fastify-plugin";
import websocket from "fastify-websocket";

/**
 * WebSocket support for Fastify. Built upon websocket-stream.
 *
 * @see websocket https://github.com/fastify/fastify-websocket
 */
export default fp(async function (fastify) {
  fastify.register(websocket, {
    options: { maxPayload: 1048576 },
  });
});
