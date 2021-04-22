function getAll(fastify) {
  const schema = {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: { $ref: "/monster#" },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.get("/", { preHandler, schema }, async (request) => {
    const monsters = await fastify.findAllMonsters();

    return {
      data: monsters,
      success: true,
    };
  });
}

function getOne(fastify) {
  const schema = {
    response: {
      200: {
        type: "object",
        properties: {
          data: { $ref: "/monster#" },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.get("/:monsterID", { preHandler, schema }, async (request) => {
    const monsterID = request.params.monsterID;
    const monster = await fastify.findMonster(monsterID);

    return {
      data: monster,
      success: true,
    };
  });
}

export default async function (fastify) {
  fastify.addSchema({
    $id: "/monster",
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      spine: { type: "string" },
      spine_json: { type: "string" },
      spine_atlas: { type: "string" },
      hp: { type: "number" },
    },
  });

  getAll(fastify);
  getOne(fastify);
}
