import { pipe, propEq, when, path } from "ramda";
import { useEffect, useState } from "react";
import { Item, RoomStatus } from "types";

interface RoundResult {
  result: "win" | "lose";
  items: Item[];
}

let ws: WebSocket | undefined = undefined;

export function useRoomJoin() {
  useEffect(() => {
    ws = new WebSocket(process.env.REACT_APP_WS || "");

    return () => {
      if (!ws) return;

      ws.close();
      ws = undefined;
    };
  }, []);
}

export function useRoomStatus() {
  const [status, setStatus] = useState<RoomStatus>();

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener(
      "message",
      pipe(
        (event: MessageEvent) => JSON.parse(event.data),
        when(
          propEq("event", "room_status"),
          pipe(path(["data", "status"]), setStatus)
        )
      )
    );
  }, []);

  return status;
}

export function useCountDown() {
  const [countdown, setCountDown] = useState();

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener(
      "message",
      pipe(
        (event: MessageEvent) => JSON.parse(event.data),
        when(
          propEq("event", "next_status_countdown"),
          pipe(path(["timer"]), setCountDown)
        )
      )
    );
  }, []);

  return countdown;
}

type useRoundResultReturn = [
  RoundResult | undefined,
  (result?: RoundResult) => void
];
export function useRoundResult(): useRoundResultReturn {
  const [result, setResult] = useState<RoundResult>();

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener(
      "message",
      pipe(
        (event: MessageEvent) => JSON.parse(event.data),
        when(propEq("event", "round_result"), pipe(path(["data"]), setResult))
      )
    );
  }, []);

  return [result, setResult];
}
