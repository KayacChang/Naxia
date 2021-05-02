export default async (fastify) => {
  const schema = {
    body: {
      type: "object",
      required: ["room_id", "uid", "options"],
      properties: {
        room_id: { type: "string" },
        uid: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              cmd: { type: "string" },
              val: { type: "number" },
            },
          },
        },
      },
    },

    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              status: { type: "string" },
              data: { type: "string" },
              event: { type: "string" },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.post("/", { preHandler, schema }, async (request) => {
    return {
      data: {
        status: "success",
        data: "",
        event: "bet-result",
      },
      success: true,
    };
  });
};
