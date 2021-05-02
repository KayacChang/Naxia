import fp from "fastify-plugin";
import sensible from "fastify-sensible";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see sensible https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify) {
  fastify.register(sensible, { errorHandler: false });
});
