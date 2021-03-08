import Channel from "./core.ts";

import * as User from "./data/user.ts";

const channel = new Channel();

channel.on("connect", (connection) => {
  connection.on("message", async (message) => {
    const proto = JSON.parse(message);

    if (proto.type === "login") {
      const user = await User.getByID(proto.id);

      if (!user) {
        connection.send(JSON.stringify({
          type: "error",
          error: `User not found by this user id ${proto.id}`,
        }));

        return;
      }

      connection.send(JSON.stringify({
        type: "user",
        data: user,
      }));
    }
  });
});

const port = Number(Deno.args[0] || "3002");
console.log(`🦕 WebSocket running on: ${port} 🦕`);
await channel.listen({ port });
