import fp from "fastify-plugin";
import { access, mkdir } from "fs/promises";
import db from "fastify-leveldb";
import { safeGet, deduplication } from "../utils/index.js";

/**
 * @see level https://github.com/fastify/fastify-leveldb
 */
export default fp(async function (fastify) {
  await access(".db").catch(() => mkdir(".db"));

  // plugins
  fastify.register(db, {
    name: "monster",
    path: ".db/monster",
  });

  // func
  fastify.decorate("findMonster", (monsterID) => {
    const db = fastify.level.monster;
    const key = `monster:${monsterID}`;

    return db.get(key).then(JSON.parse);
  });

  fastify.decorate("findAllMonsterIDs", () => {
    const db = fastify.level.monster;
    const key = `monsters`;

    return safeGet(db, key, []);
  });

  fastify.decorate("findAllMonsters", async () => {
    const monsters = await fastify.findAllMonsterIDs();

    return Promise.all(monsters.map(fastify.findMonster));
  });

  fastify.decorate("addMonster", async (monster) => {
    const db = fastify.level.monster;

    const monsters = await fastify.findAllMonsterIDs();
    const newMonsters = deduplication([...monsters, monster.id]);

    await db
      .batch()
      .put(`monster:${monster.id}`, JSON.stringify(monster))
      .put(`monsters`, JSON.stringify(newMonsters))
      .write();

    return fastify.findMonster(monster.id);
  });
});
