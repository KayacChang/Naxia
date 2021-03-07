import Channel from "./core.ts";

import * as User from "./data/user.ts";

const channel = new Channel();

channel.on("connect", (connection) => {
  connection.on("message", async (message) => {
    const proto = JSON.parse(message);

    if (proto.type === "login") {
      const user = await User.getByID(proto.id);

      connection.send(JSON.stringify(user));
    }
  });
});

const port = Number(Deno.args[0] || "3002");
console.log(`🦕 WebSocket running on: ${port} 🦕`);
await channel.listen({ port });
