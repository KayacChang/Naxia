import fp from "fastify-plugin";
import { access, mkdir } from "fs/promises";
import db from "fastify-leveldb";
import { safeGet } from "../utils/index.js";

/**
 * @see level https://github.com/fastify/fastify-leveldb
 */
export default fp(async function (fastify) {
  await access(".db").catch(() => mkdir(".db"));

  // plugins
  fastify.register(db, {
    name: "user",
    path: ".db/user",
  });

  // func
  fastify.decorate("findUser", (username) => {
    const db = fastify.level.user;
    const key = `user:${username}`;

    return db.get(key).then(JSON.parse);
  });

  fastify.decorate("addUser", async (user) => {
    const db = fastify.level.user;
    const key = `user:${user.username}`;

    await db.put(key, JSON.stringify(user));

    return fastify.findUser(user.username);
  });

  fastify.decorate("updateUser", async (username, user) => {
    const oldUser = await fastify.findUser(username);

    return fastify.addUser({ ...oldUser, ...user });
  });

  fastify.decorate("findItemsBelongUser", (username) => {
    const db = fastify.level.user;
    const key = `user:${username}:items`;

    return safeGet(db, key, []);
  });

  fastify.decorate("updateItemsBelongUser", (username, items) => {
    const db = fastify.level.user;
    const key = `user:${username}:items`;

    return db.put(key, JSON.stringify(items));
  });

  fastify.decorate("addItemsToUser", async (username, items) => {
    const oldItems = await fastify.findItemsBelongUser(username);

    return fastify.updateItemsBelongUser(username, [...oldItems, ...items]);
  });
});
