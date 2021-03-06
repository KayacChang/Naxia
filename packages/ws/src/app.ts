import Channel from "./core.ts";

const channel = new Channel<{
  echo: (data: { message: string }) => void;
}>();

channel.subscribe("echo", ({ message }) => {
  console.log(message);
});

const port = Number(Deno.args[0] || "3002");
console.log(`🦕 WebSocket running on: ${port} 🦕`);
await channel.listen({ port });
