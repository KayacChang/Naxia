import fp from "fastify-plugin";
import cors from "fastify-cors";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see sensible https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify) {
  fastify.register(cors, {
    origin: "*",
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
});
