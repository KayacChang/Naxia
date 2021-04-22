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
                type: { type: "string" },
                item_name: { type: ["string", "null"] },
                count: { type: "number" },
                accumulate: { type: "number" },
                is_reach: { type: "boolean" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function getAllConditions(request) {
    const dungeonID = request.params.dungeonID;
    const dungeon = await fastify.findDungeon(dungeonID);

    return {
      data: dungeon.conditions,
      success: true,
    };
  }
  fastify.get(
    "/:mapID/dungeons/:dungeonID/conditions",
    { preHandler, schema },
    getAllConditions
  );
}
