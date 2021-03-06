import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import { EventEmitter } from "https://deno.land/x/event/mod.ts";
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

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

type ConnectionEvents = {
  close: [];
  ping: [];
  message: [string];
};
class Connection extends EventEmitter<ConnectionEvents> {
  constructor(private socket: WebSocket) {
    super();
    this.heartbeat(socket);
    this.listen(socket);
  }

  private async listen(socket: WebSocket) {
    try {
      for await (const event of socket) {
        this.handle(event);
      }
    } catch (err) {
      failedToReceive(socket, err);
    }
  }

  private async heartbeat(socket: WebSocket) {
    while (!socket.isClosed) {
      await wait(300);
    }

    this.emit("close");
  }

  private handle(event: WebSocketEvent) {
    if (isWebSocketCloseEvent(event)) {
      return this.emit("close");
    }

    if (isWebSocketPingEvent(event)) {
      return this.emit("ping");
    }

    if (typeof event === "string") {
      return this.emit("message", event);
    }
  }

  send(msg: string) {
    return this.socket.send(msg);
  }
}

type ChannelEvents = {
  connect: [Connection];
};
export default class Channel<Subscribe, Publish>
  extends EventEmitter<ChannelEvents> {
  #listeners = Object.create(null);
  #connections: Connection[] = [];

  async listen(addr: Parameters<typeof serve>[0]) {
    for await (const req of serve(addr)) {
      if (!acceptable(req)) {
        failedToAccept(req);

        continue;
      }

      const socket = await acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      });

      const connection = new Connection(socket);

      connection.on("message", (str) => {
        const { type, ...message } = JSON.parse(str);

        for (const callback of this.#listeners[type] || []) {
          callback(message);
        }
      });

      this.#connections = [...this.#connections, connection];
      this.emit("connect", connection);
    }
  }

  publish(event: Publish) {
    for (const connection of this.#connections) {
      connection.send(JSON.stringify({ type: event }));
    }
  }

  subscribe<E extends keyof Subscribe>(event: E, listener: Subscribe[E]) {
    this.#listeners[event] = this.#listeners[event]
      ? [...this.#listeners[event], listener]
      : [listener];
  }
}
