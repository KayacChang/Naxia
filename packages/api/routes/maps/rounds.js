function all(fastify, preHandler) {
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
                results: { type: "array", items: { type: "string" } },
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

function add(fastify) {
  const schema = {
    body: {
      type: "object",
      properties: {
        results: { type: "array", items: { type: "string" } },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                results: { type: "array", items: { type: "string" } },
                created_at: { type: "string" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  async function addRound(request) {
    const dungeonID = request.params.dungeonID;
    const results = request.body.results;

    const rounds = await fastify.findRoundsBelongDungeon(dungeonID);

    const round = await fastify.addRound({
      id: rounds.length,
      dungeon_id: dungeonID,
      results,
      created_at: new Date().toISOString(),
    });

    return {
      data: round,
      success: true,
    };
  }
  fastify.post("/:mapID/dungeons/:dungeonID/rounds", { schema }, addRound);
}

export default async function (fastify) {
  const preHandler = fastify.auth([fastify.verifyJWT]);

  all(fastify, preHandler);
  add(fastify);
}
