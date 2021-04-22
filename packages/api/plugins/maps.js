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
    name: "map",
    path: ".db/map",
  });

  // func
  fastify.decorate("findMap", (mapID) => {
    const db = fastify.level.map;
    const key = `map:${mapID}`;

    return db.get(key).then(JSON.parse);
  });

  fastify.decorate("findAllMaps", async () => {
    const mapIDs = await fastify.findAllMapIDs();

    return Promise.all(mapIDs.map(fastify.findMap));
  });

  fastify.decorate("findAllMapIDs", () => {
    const db = fastify.level.map;
    const key = `mapIDs`;

    return safeGet(db, key, []);
  });

  fastify.decorate("addMap", async (map) => {
    const db = fastify.level.map;

    const maps = await fastify.findAllMapIDs();
    const newMaps = deduplication([...maps, map.id]);

    await db
      .batch()
      .put(`map:${map.id}`, JSON.stringify(map))
      .put(`mapIDs`, JSON.stringify(newMaps))
      .write();

    return fastify.findMap(map.id);
  });

  fastify.decorate("findDungeonIDsInMap", (mapID) => {
    const db = fastify.level.map;
    const key = `map:${mapID}:dungeons`;

    return safeGet(db, key, []);
  });

  fastify.decorate("findDungeonsInMap", async (mapID) => {
    const dungeons = await fastify.findDungeonIDsInMap(mapID);

    return Promise.all(dungeons.map(fastify.findDungeon));
  });

  fastify.decorate("findDungeon", (dungeonID) => {
    const db = fastify.level.map;
    const key = `dungeon:${dungeonID}`;

    return db.get(key).then(JSON.parse);
  });

  fastify.decorate("addDungeon", async (dungeon) => {
    const db = fastify.level.map;

    const dungeonIDs = await fastify.findDungeonIDsInMap();
    const newDungeonIDs = deduplication([...dungeonIDs, dungeon.id]);

    await db
      .batch()
      .put(`dungeon:${dungeon.id}`, JSON.stringify(dungeon))
      .put(`map:${dungeon.map_id}:dungeons`, JSON.stringify(newDungeonIDs))
      .write();

    return fastify.findDungeon(dungeon.id);
  });

  fastify.decorate("findRound", (roundID) => {
    const db = fastify.level.map;
    const key = `round:${roundID}`;

    return db.get(key).then(JSON.parse);
  });

  fastify.decorate("findRoundIDsBelongDungeon", (dungeonID) => {
    const db = fastify.level.map;
    const key = `dungeon:${dungeonID}:rounds`;

    return safeGet(db, key, []);
  });

  fastify.decorate("findRoundsBelongDungeon", async (dungeonID) => {
    const roundIDs = await fastify.findRoundIDsBelongDungeon(dungeonID);

    return Promise.all(roundIDs.map(fastify.findRound));
  });

  fastify.decorate("addRound", async (round) => {
    const db = fastify.level.map;

    const roundIDs = await fastify.findRoundIDsBelongDungeon(round.dungeon_id);
    const newRoundIDs = deduplication([...roundIDs, round.id]);

    await db
      .batch()
      .put(`round:${round.id}`, JSON.stringify(round))
      .put(`dungeon:${round.dungeon_id}:rounds`, JSON.stringify(newRoundIDs))
      .write();

    return fastify.findRound(round.id);
  });
});
