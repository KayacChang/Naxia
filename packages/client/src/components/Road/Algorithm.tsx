import { Round as TRound } from "types";

type Table<T> = T[][];

function create<T>(width = 0, height = 0, init?: T): Table<T> {
  return Array(width)
    .fill(null)
    .map(() => Array(height).fill(init));
}

type MapFn<T> = (value: T, index: number) => any;

export function flatMap<T>(fn: MapFn<T>, table: Table<T>) {
  return table.map((row, rowIndex) =>
    row.map((col, colIndex) => fn(col, rowIndex * row.length + colIndex))
  );
}

const RowHeight = 6;

export enum Result {
  Banker = "B",
  Player = "P",
  Tie = "T",
  BankerPair = "BP",
  PlayerPair = "PP",
}

export function RoundToResult({ results }: TRound) {
  return results.map((result) => {
    return result === "banker"
      ? Result.Banker
      : result === "player"
      ? Result.Player
      : result === "tie"
      ? Result.Tie
      : result === "bank_pair"
      ? Result.BankerPair
      : Result.PlayerPair;
  });
}

export enum Icon {
  Red = "R",
  Blue = "B",
  RedSmall = "RS",
  BlueSmall = "BS",
}

type Round = Result[];
type History = Round[];

type BigRoadResult = {
  icons: Icon[];
  tie: number;
};
type Position = { x: number; y: number };

function clamp(min: number, max: number, num: number) {
  return Math.min(Math.max(num, min), max);
}

export function BigRoad(width: number, history: History) {
  const table: Table<BigRoadResult | undefined> = create(width, RowHeight);

  function limit({ x, y }: Position): Position {
    return {
      x: clamp(0, width - 1, x),
      y: clamp(0, RowHeight - 1, y),
    };
  }

  function next({ x, y }: Position): Position {
    if (y + 1 < RowHeight && table[x][y + 1] === undefined) {
      return { x, y: y + 1 };
    }

    if (x + 1 < width) {
      return { x: x + 1, y };
    }

    return { x, y };
  }

  let last: Result | undefined = undefined;
  let row = 0;
  let cursor: Position = { x: 0, y: 0 };

  let pretie = 0;
  let tie = 0;

  history.slice(0, width * RowHeight).forEach((round) => {
    if (round.includes(Result.Tie)) {
      if (!table[cursor.x][cursor.y]) {
        pretie += 1;

        return;
      }

      tie += 1;

      return;
    }

    if (table[cursor.x][cursor.y]) {
      if (pretie > 0) {
        tie = pretie;

        pretie = 0;
      }

      table[cursor.x][cursor.y] = Object.assign(table[cursor.x][cursor.y], {
        tie,
      });

      tie = 0;
    }

    const current = round.includes(Result.Banker)
      ? Result.Banker
      : Result.Player;

    if (last === undefined) {
      last = current;
    } else if (last !== current) {
      last = current;
      cursor = limit({ x: row + 1, y: 0 });
      row = clamp(0, width, row + 1);
    } else {
      cursor = limit(next(cursor));
    }

    const icons = round.map((result) => {
      return result === Result.Banker
        ? Icon.Red
        : result === Result.BankerPair
        ? Icon.RedSmall
        : result === Result.Player
        ? Icon.Blue
        : Icon.BlueSmall;
    });

    table[cursor.x][cursor.y] = { icons, tie };
  });

  return table;
}

function toTable(width: number, history: History) {
  let table: Result[][] = [];
  let last: Result | undefined = undefined;

  history.slice(0, width * RowHeight).forEach((round) => {
    if (round.includes(Result.Tie)) return;

    const current = round.includes(Result.Banker)
      ? Result.Banker
      : Result.Player;

    if (last !== current) {
      last = current;

      table.push([]);
    }

    table[table.length - 1].push(current);
  });

  return table;
}

function Base(width: number, history: History, offsetX: number) {
  const table = toTable(width, history);

  const result: Table<Icon | undefined> = create(width, RowHeight);

  function limit({ x, y }: Position): Position {
    return {
      x: clamp(0, width - 1, x),
      y: clamp(0, RowHeight - 1, y),
    };
  }

  function next({ x, y }: Position): Position {
    if (y + 1 < RowHeight && result[x][y + 1] === undefined) {
      return { x, y: y + 1 };
    }

    if (x + 1 < width) {
      return { x: x + 1, y };
    }

    return { x, y };
  }

  let cursor: Position = { x: 0, y: 0 };
  let row = 0;
  let last: Icon | undefined = undefined;

  for (let x = offsetX; x < table.length; x++) {
    //
    for (let y = 1; y < table[x].length; y++) {
      const hasPair = Boolean(table[x - offsetX][y]);

      const longTail = y >= 2;

      if ((hasPair || longTail) && last !== Icon.Red) {
        last = Icon.Red;

        if (cursor.x !== 0 || cursor.y !== 0) {
          cursor = limit({ x: row + 1, y: 0 });
          row = clamp(0, width, row + 1);
        }

        result[cursor.x][cursor.y] = Icon.Red;
      } else if (hasPair || longTail) {
        last = Icon.Red;

        result[cursor.x][cursor.y] = Icon.Red;
      } else {
        last = Icon.Blue;
        result[cursor.x][cursor.y] = Icon.Blue;
      }

      cursor = limit(next(cursor));
    }

    if (x >= table.length - 1) break;

    if (last !== Icon.Blue) {
      last = Icon.Blue;

      if (cursor.x !== 0 || cursor.y !== 0) {
        cursor = limit({ x: row + 1, y: 0 });
        row = clamp(0, width, row + 1);
      }

      result[cursor.x][cursor.y] = Icon.Blue;
    } else {
      last = Icon.Blue;
      result[cursor.x][cursor.y] = Icon.Blue;
    }

    cursor = limit(next(cursor));
  }

  return result;
}

export function BigEyeRoad(width: number, history: History) {
  return Base(width, history, 1);
}

export function SmallRoad(width: number, history: History) {
  return Base(width, history, 2);
}

export function CockroachRoad(width: number, history: History) {
  return Base(width, history, 3);
}
