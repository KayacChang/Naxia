import maps from "./maps.js";
import dungeons from "./dungeons.js";
import conditions from "./conditions.js";
import rounds from "./rounds.js";
import info from "./info.js";
import unlock from "./unlock.js";
import npc from "./npc.js";

export default async function (fastify) {
  maps(fastify);
  dungeons(fastify);
  conditions(fastify);
  rounds(fastify);
  info(fastify);
  unlock(fastify);
  npc(fastify);
}
