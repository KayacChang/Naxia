function getAll(fastify) {
  const schema = {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              card: {
                type: "array",
                items: { $ref: "/item#" },
              },
              other: {
                type: "array",
                items: { $ref: "/item#" },
              },
            },
          },
          success: { type: "boolean" },
        },
      },
    },
  };

  const preHandler = fastify.auth([fastify.verifyJWT]);

  fastify.get("/items", { preHandler, schema }, async (request) => {
    return {
      data: {
        card: [
          {
            id: 1,
            name: "美杜莎卡片",
            category: "card",
            item_type: "item",
            item_name: "美杜莎卡片",
            item_count: 1,
            item_img: "https://storage.googleapis.com/naxia-dev/photos/key.png",
            requirements: [
              {
                type: "point",
                count: 200,
                item_id: null,
                item_name: null,
                accumulate: 500,
              },
              {
                type: "item",
                count: 20,
                item_id: 1,
                item_name: "美杜莎碎片",
                accumulate: 5,
              },
            ],
          },
        ],
        other: [
          {
            id: 10,
            name: "美杜莎卡片 - 點數兌換",
            category: "other",
            item_type: "point",
            item_name: null,
            item_count: 1000,
            item_img: null,
            requirements: [
              {
                type: "item",
                count: 1,
                item_id: 14,
                item_name: "美杜莎卡片",
                accumulate: 0,
              },
            ],
          },
        ],
      },
      success: true,
    };
  });
}

export default async function (fastify) {
  fastify.addSchema({
    $id: "/item",
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      category: { type: "string" },
      item_type: { type: "string" },
      item_name: { type: ["string", "null"] },
      item_count: { type: "number" },
      item_img: { type: "string" },
      requirements: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string" },
            count: { type: "number" },
            item_id: { type: ["number", "null"] },
            item_name: { type: ["string", "null"] },
            accumulate: { type: "number" },
          },
        },
      },
    },
  });

  getAll(fastify);
}
