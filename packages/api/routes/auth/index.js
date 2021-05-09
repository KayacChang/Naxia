export default async function (fastify) {
  const schema = {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
              ttl: { type: "string" },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyUserAndPassword]);

  fastify.post("/login", { preHandler, schema }, async (request, reply) => {
    const { username, password } = request.body;

    const token = await reply.jwtSign({ username, password });
    const ttl = new Date();

    return {
      data: { token, ttl },
      success: true,
    };
  });
}
