import Channel from "./core.ts";
import login from "./logic/login.ts";
import getRepositoryByUserID from "./logic/repository.ts";
import getAllArea from "./logic/area.ts";

const channel = new Channel();

channel.on("connect", (connection) => {
  connection.on("message", (message) => {
    const proto = JSON.parse(message);

    if (proto.type === "login") {
      return login(connection, proto);
    }

    if (proto.type === "repository") {
      return getRepositoryByUserID(connection, proto);
    }

    if (proto.type === "area") {
      return getAllArea(connection, proto);
    }
  });
});

const port = Number(Deno.args[0] || "3002");
console.log(`🦕 WebSocket running on: ${port} 🦕`);
await channel.listen({ port });
