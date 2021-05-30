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
              name: { type: "string" },
              img: { type: "string" },
              dialog: { type: "array", items: { type: "string" } },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function getNPC(request) {
    return {
      data: {
        id: 1,
        name: "Amy",
        img:
          "https://storage.googleapis.com/naxia-dev/photos/%E7%BE%8E%E5%A5%B3.png",
        dialog: ["你就是傳說中的勇者嗎？", "娜希亞大陸最後的希望"],
      },
      success: true,
    };
  }
  fastify.get("/:mapID/npc", { preHandler, schema }, getNPC);
}
