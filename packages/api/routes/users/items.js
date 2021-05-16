export default function (fastify) {
  const schema = {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                count: { type: "number" },
                name: { type: "string" },
                quality: { type: "number" },
                point: { type: "number" },
                img: { type: "string" },
                description: { type: "string" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.get("/items", { preHandler, schema }, async (request) => {
    const items = await fastify.findItemsBelongUser(request.user.username);

    return {
      data: items,
      success: true,
    };
  });
}
