export default function (fastify) {
  const schema = {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              id: { type: "number" },
              uid: { type: "string" },
              name: { type: "string" },
              level: { type: "number" },
              avatar: { type: "string" },
              balance: { type: "number" },
              ip: { type: "string" },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.get("/", { preHandler, schema }, async (request) => {
    const { username, password, ...user } = await fastify.findUser(
      request.user.username
    );

    return {
      data: {
        ...user,
        ip: request.ip,
      },
      success: true,
    };
  });

  fastify.put("/", { preHandler, schema }, async (request) => {
    const user = await fastify.updateUser(request.user.username, {
      ...request.body,
    });

    return {
      data: {
        ...user,
        ip: request.ip,
      },
      success: true,
    };
  });
}
