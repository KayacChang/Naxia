import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import { EventEmitter } from "https://deno.land/std/node/events.ts";
import {
  acceptable,
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
  WebSocketEvent,
} from "https://deno.land/std/ws/mod.ts";

function failedToAccept(request: ServerRequest) {
  const msg = `failed to accept websocket`;

  console.error(msg);

  request.respond({ status: 400, body: msg });
}

function failedToReceive(socket: WebSocket, err: Error) {
  const msg = `failed to receive frame: ${err}`;

  console.error(msg);

  if (!socket.isClosed) {
    socket.close(1000).catch(console.error);
  }
}

type ConnectionEvent = {
  event: "close";
  listener: () => void;
} | {
  event: "ping";
  listener: () => void;
} | {
  event: "message";
  listener: (message: string) => void;
};

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

class Connection {
  #emitter = new EventEmitter();

  constructor(private socket: WebSocket) {
    this.heartbeat();
  }

  private async heartbeat() {
    while (!this.socket.isClosed) {
      await wait(300);
    }

    this.#emitter.emit("close");
  }

  handle(event: WebSocketEvent) {
    if (isWebSocketCloseEvent(event)) {
      return this.#emitter.emit("close");
    }

    if (isWebSocketPingEvent(event)) {
      return this.#emitter.emit("ping");
    }

    return this.#emitter.emit("message", event);
  }

  send(msg: string) {
    return this.socket.send(msg);
  }

  on(event: ConnectionEvent["event"], listener: ConnectionEvent["listener"]) {
    this.#emitter.on(event, listener);
  }
}

type ApplicationEvent = {
  event: "connection";
  listener: (connection: Connection) => void;
};

export default class Application {
  #emitter = new EventEmitter();

  async listen(addr: Parameters<typeof serve>[0]) {
    for await (const req of serve(addr)) {
      acceptable(req) ? this.handleRequest(req) : failedToAccept(req);
    }
  }

  private async handleRequest(
    { conn, r: bufReader, w: bufWriter, headers }: ServerRequest,
  ) {
    const socket = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });

    const connection = new Connection(socket);

    this.#emitter.emit("connection", connection);

    try {
      for await (const event of socket) {
        connection.handle(event);
      }
    } catch (err) {
      failedToReceive(socket, err);
    }
  }

  on(event: ApplicationEvent["event"], listener: ApplicationEvent["listener"]) {
    this.#emitter.on(event, listener);
  }
}
