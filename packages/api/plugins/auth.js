import { equals } from "ramda";
import fp from "fastify-plugin";
import auth from "fastify-auth";
import jwt from "fastify-jwt";

/**
 * This plugins adds utility to handle authentication
 *
 * @see auth https://github.com/fastify/fastify-auth
 * @see jwt https://github.com/fastify/fastify-jwt
 */
export default fp(async function (fastify, opts) {
  // plugins
  fastify.register(auth);
  fastify.register(jwt, { secret: "supersecret" });

  // verifyUserAndPassword
  fastify.decorate("verifyUserAndPassword", async (request) => {
    const { username, password } = request.body;
    const user = await fastify.findUser(username);

    if (!equals(user, { username, password })) {
      return new Error("Not valid");
    }
  });

  // verifyJWT
  fastify.decorate("verifyJWT", async (request) => {
    const { username, password } = await request.jwtVerify();
    const user = await fastify.findUser(username);

    if (!equals(user, { username, password })) {
      return new Error("Not valid");
    }
  });
});
