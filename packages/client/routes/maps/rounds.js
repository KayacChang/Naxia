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
                result: { type: "string" },
                created_at: { type: "string" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function getAllRounds(request) {
    const dungeonID = request.params.dungeonID;
    const rounds = await fastify.findRoundsBelongDungeon(dungeonID);

    return {
      data: rounds,
      success: true,
    };
  }
  fastify.get(
    "/:mapID/dungeons/:dungeonID/rounds",
    { preHandler, schema },
    getAllRounds
  );
}
