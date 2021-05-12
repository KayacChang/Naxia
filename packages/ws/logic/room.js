import { BehaviorSubject, interval } from "rxjs";
import { filter, map, share, throttleTime } from "rxjs/operators";
import { Random, MersenneTwister19937 } from "random-js";
import fetch from "node-fetch";

const random = new Random(MersenneTwister19937.autoSeed());

const Second = 1000;
const TimeInterval = 1 * Second;

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
    info: {
      game_round: "1620099597851",
      banker: true,
      player: false,
      tie: false,
      bank_pair: false,
      player_pair: false,
    },
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
    result: "win",
    info: {
      game_round: "1620099597851",
      banker: false,
      player: true,
      tie: false,
      bank_pair: false,
      player_pair: false,
    },
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
    info: {
      game_round: "1620099597851",
      banker: false,
      player: false,
      tie: true,
      bank_pair: false,
      player_pair: false,
    },
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
    info: {
      game_round: "1620099597851",
      banker: false,
      player: true,
      tie: false,
      bank_pair: true,
      player_pair: false,
    },
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
    info: {
      game_round: "1620099597851",
      banker: true,
      player: false,
      tie: false,
      bank_pair: false,
      player_pair: true,
    },
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
    info: {
      game_round: "1620099597851",
      banker: false,
      player: true,
      tie: false,
      bank_pair: false,
      player_pair: false,
    },
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

const bosses = [
  {
    id: 0,
    name: "骷顱人",
    spine: "https://storage.googleapis.com/naxia-dev/guaiwu1.png",
    spine_json: "https://storage.googleapis.com/naxia-dev/guaiwu1.json",
    spine_atlas: "https://storage.googleapis.com/naxia-dev/guaiwu1.atlas",
    hp: 1,
    rate: "30.0000",
  },
  {
    id: 1,
    name: "怪人",
    spine: "https://storage.googleapis.com/naxia-dev/guaiwu1.png",
    spine_json: "https://storage.googleapis.com/naxia-dev/guaiwu1.json",
    spine_atlas: "https://storage.googleapis.com/naxia-dev/guaiwu1.atlas",
    hp: 1,
    rate: "30.0000",
  },
];

function* GameStatus() {
  while (true) {
    yield* [
      Event.RoomStatus(RoomStatus.Change),
      Event.RoomStatus(RoomStatus.Start),
      Event.RoomStatus(RoomStatus.Stop),
      Event.RoomStatus(RoomStatus.Result),
    ];
  }
}

const Loop = interval(TimeInterval).pipe(share());

const Count = Loop.pipe(
  map((time) => Event.CountDown(10 - (time % 10))),
  share({ connector: () => new BehaviorSubject() })
);

const status = GameStatus();
const Status = Loop.pipe(
  throttleTime(10 * Second),
  map(() => status.next().value),
  share({ connector: () => new BehaviorSubject() })
);

const Boss = Status.pipe(
  filter(Boolean),
  filter(({ data }) => data.status === RoomStatus.Result),
  map(() => Event.Boss(random.pick(bosses))),
  share({ connector: () => new BehaviorSubject() })
);

const Result = Status.pipe(
  filter(Boolean),
  filter(({ data }) => data.status === RoomStatus.Result),
  map(() => Event.RoundResult(random.pick(results))),
  share({ connector: () => new BehaviorSubject() })
);

Status.subscribe(console.log);
Count.subscribe(console.log);
Boss.subscribe(console.log);
Result.subscribe((result) => {
  if (!result) return;

  console.log(result);

  const results = Object.entries(result.data.info)
    .filter(([key]) => key !== "game_round")
    .filter(([, value]) => value === true)
    .map(([name]) => name);

  fetch(`${process.env.API}/maps/1/dungeons/1/rounds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ results }),
  });
});

export function join(connection) {
  function send(event) {
    if (Array.isArray(event)) {
      return event.forEach((event) =>
        connection.socket.send(JSON.stringify(event))
      );
    }
    return connection.socket.send(JSON.stringify(event));
  }

  Count.subscribe(send);
  Status.subscribe(send);
  Boss.subscribe(send);
  Result.subscribe(send);
}

export default { join };
