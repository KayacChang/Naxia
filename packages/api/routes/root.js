export default async (fastify) => {
  fastify.get("/", () => ({ root: true }));
};
