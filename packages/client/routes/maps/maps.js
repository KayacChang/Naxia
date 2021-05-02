export default async function (fastify) {
  const preHandler = fastify.auth([fastify.verifyJWT]);

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
                name: { type: "string" },
                status: { type: "number" },
                image_url: { type: "string" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function getAllMaps(request) {
    const maps = await fastify.findAllMaps();

    return {
      data: maps,
      success: true,
    };
  }
  fastify.get("/", { preHandler, schema }, getAllMaps);
}
