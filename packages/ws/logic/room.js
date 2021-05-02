import R from "ramda";
import { interval } from "rxjs";
import { map, share } from "rxjs/operators";
import { Random, MersenneTwister19937 } from "random-js";

const random = new Random(MersenneTwister19937.autoSeed());

const TimeInterval = 1000;

const RoomStatus = {
  Change: 0, // 洗牌中
  Start: 1, // 開始下注
  Stop: 2, // 停止下注
  Result: 3, // 開牌結果
};

const Event = {
  RoomStatus: (status) => ({
    event: "room_status",
    data: { status },
  }),

  CountDown: (timer) => ({
    event: "next_status_countdown",
    timer,
  }),

  Boss: (boss) => ({
    event: "next_round_monster",
    data: boss,
  }),

  RoundStatus: (status) => ({
    event: "round_status",
    data: {
      bet_a: 0,
      bet_b: 0,
      bet_c: 0,
      bet_d: 0,
      bet_e: 0,
    },
  }),

  RoundResult: (result) => ({
    event: "round_result",
    data: result,
  }),

  OnlineUser: (number) => ({
    event: "room_online_user",
    number,
  }),
};

const results = [
  {
    result: "win",
    items: [
      {
        id: 1,
        name: "美杜莎碎片",
        img: "https://storage.googleapis.com/naxia-dev/maxresdefault.jpg",
        quality: 1,
        count: 1,
      },
      {
        id: 12,
        name: "黃金",
        img: "https://storage.googleapis.com/naxia-dev/maxresdefault.jpg",
        quality: 1,
        count: 1,
      },
      {
        id: 10,
        name: "金屬塊",
        img: "https://storage.googleapis.com/naxia-dev/maxresdefault.jpg",
        quality: 1,
        count: 4,
      },
    ],
  },
  {
    result: "lose",
    items: [
      {
        id: 10,
        name: "金屬塊",
        img: "https://storage.googleapis.com/naxia-dev/maxresdefault.jpg",
        quality: 1,
        count: 1,
      },
      {
        id: 11,
        name: "樹枝",
        img: "https://storage.googleapis.com/naxia-dev/maxresdefault.jpg",
        quality: 1,
        count: 1,
      },
    ],
  },
];

const Count = (time) =>
  R.pipe(R.reverse, R.map(Event.CountDown))(R.range(0, time));

const GameLoop = {
  [RoomStatus.Change]: [Event.RoomStatus(RoomStatus.Change), ...Count(10)],
  [RoomStatus.Start]: [Event.RoomStatus(RoomStatus.Start), ...Count(10)],
  [RoomStatus.Stop]: [Event.RoomStatus(RoomStatus.Stop), ...Count(10)],
  [RoomStatus.Result]: [
    [
      Event.RoomStatus(RoomStatus.Result),
      Event.RoundResult(results[1]),
      Event.Boss({
        id: 9,
        name: "骷顱人",
        spine: "https://storage.googleapis.com/naxia-dev/guaiwu1.png",
        spine_json: "https://storage.googleapis.com/naxia-dev/guaiwu1.json",
        spine_atlas: "https://storage.googleapis.com/naxia-dev/guaiwu1.atlas",
        hp: 1,
        rate: "30.0000",
      }),
    ],
    ...Count(10),
  ],
};

const GameEvents = Object.values(GameLoop).flat();

const Room = interval(TimeInterval).pipe(
  map((value) => GameEvents[value % GameEvents.length]),
  share()
);

Room.subscribe(console.log);

export function join(connection) {
  Room.subscribe((event) => {
    if (Array.isArray(event)) {
      return event.forEach((event) =>
        connection.socket.send(JSON.stringify(event))
      );
    }

    return connection.socket.send(JSON.stringify(event));
  });
}

export default { join };
