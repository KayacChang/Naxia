export default async function (fastify) {
  const preHandler = fastify.auth([fastify.verifyJWT]);

  const schema = {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              id: { type: "number" },
              map_id: { type: "number" },
              name: { type: "string" },
              img: { type: "string" },
              room_id: { type: "string" },
              stream_link: { type: "string" },
              location_x: { type: "number" },
              location_y: { type: "number" },
              is_lock: { type: "boolean" },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function unlock(request) {
    const dungeonID = request.params.dungeonID;
    const dungeon = await fastify.updateDungeon(dungeonID, { is_lock: false });

    return {
      data: dungeon,
      success: true,
    };
  }
  fastify.post(
    "/:mapID/dungeons/:dungeonID/unlock",
    { preHandler, schema },
    unlock
  );
}
