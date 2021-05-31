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
                map_id: { type: "number" },
                name: { type: "string" },
                img: { type: "string" },
                room_id: { type: "string" },
                stream_link: { type: "string" },
                location_x: { type: "number" },
                location_y: { type: "number" },
                isLock: { type: "boolean" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function getAllDungeons(request) {
    const mapID = request.params.mapID;
    const dungeons = await fastify.findDungeonsInMap(mapID);

    return {
      data: dungeons,
      success: true,
    };
  }
  fastify.get("/:mapID/dungeons", { preHandler, schema }, getAllDungeons);
}
