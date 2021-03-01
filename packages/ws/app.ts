import Application from "./ws.ts";

const server = new Application();

server.on("connection", (connection) => {
  console.log("connection begin");

  connection.on("message", (message) => {
    console.log(message);
  });

  connection.on("close", () => {
    console.log("connection close");
  });
});

const port = Number(Deno.args[0] || "3002");
console.log(`🦕 WebSocket running on: ${port} 🦕`);
await server.listen({ port });
