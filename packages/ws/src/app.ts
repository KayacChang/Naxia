import Channel from "./core.ts";

type Subscribe = {};
type Publish = "profile_info";
const channel = new Channel<Subscribe, Publish>();

channel.on("connect", () => {
  channel.publish("profile_info");
});

const port = Number(Deno.args[0] || "3002");
console.log(`🦕 WebSocket running on: ${port} 🦕`);
await channel.listen({ port });
