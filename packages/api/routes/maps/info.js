export default async function (fastify) {
  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.addSchema({
    $id: "/dungeons/info/skill",
    type: "object",
    properties: {
      img: { type: "string" },
      name: { type: "string" },
    },
  });

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
              bet_options: {
                type: "array",
                items: { type: "number" },
              },
              skill_options: {
                type: "object",
                properties: {
                  banker: { $ref: "/dungeons/info/skill#" },
                  player: { $ref: "/dungeons/info/skill#" },
                  tie: { $ref: "/dungeons/info/skill#" },
                  bank_pair: { $ref: "/dungeons/info/skill#" },
                  player_pair: { $ref: "/dungeons/info/skill#" },
                },
              },
              location_x: { type: "number" },
              location_y: { type: "number" },
              isLock: { type: "boolean" },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function getInfo(request) {
    const dungeonID = request.params.dungeonID;
    const dungeon = await fastify.findDungeon(dungeonID);

    return {
      data: dungeon,
      success: true,
    };
  }
  fastify.get(
    "/:mapID/dungeons/:dungeonID/info",
    { preHandler, schema },
    getInfo
  );
}
