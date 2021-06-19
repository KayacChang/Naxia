import { pipe } from "ramda";
import { Round, SkillOption } from "types";

interface Result {
  type: "banker" | "player";
  pair: ("bank_pair" | "player_pair")[];
  tie: number;
}

function algorithmA(rounds: Round[]) {
  const table: SkillOption[][][] = [[]];
  let currentWin: "banker" | "player" | undefined = undefined;

  rounds.forEach((round) => {
    const isBankerWin = round.results.includes("banker");
    const isPlayerWin = round.results.includes("player");
    const isTie = round.results.includes("tie");
    const isBankPair = round.results.includes("bank_pair");
    const isPlayerPair = round.results.includes("player_pair");

    if (!currentWin && isBankerWin) {
      currentWin = "banker";
    }

    if (!currentWin && isPlayerWin) {
      currentWin = "player";
    }

    // switch
    if (
      (isBankerWin && currentWin === "player") ||
      (isPlayerWin && currentWin === "banker")
    ) {
      if (isBankerWin) currentWin = "banker";
      if (isPlayerWin) currentWin = "player";

      table.push([]);
    }

    let results: SkillOption[] = [];

    if (isBankerWin) {
      results.push("banker");
    }

    if (isPlayerWin) {
      results.push("player");
    }

    if (isTie) {
      results.push("tie");
    }

    if (isBankPair) {
      results.push("bank_pair");
    }

    if (isPlayerPair) {
      results.push("player_pair");
    }

    table[table.length - 1].push(results);
  });

  return table;
}

function algorithmB(table: SkillOption[][][]) {
  const results: Result[][] = [];

  table.forEach((row) => {
    const resultRow: Result[] = [];

    let tie = 0;

    row.forEach((col, index) => {
      if (col.includes("tie")) {
        tie += 1;

        if (row.length - 1 === index) {
          resultRow[resultRow.length - 1].tie = tie;
        }

        return;
      }

      if (resultRow[resultRow.length - 1]) {
        resultRow[resultRow.length - 1].tie = tie;
      }

      tie = 0;
      resultRow.push({
        type: col.includes("player") ? "player" : "banker",
        pair: col.filter((res) =>
          ["bank_pair", "player_pair"].includes(res)
        ) as ("bank_pair" | "player_pair")[],
        tie,
      });
    });

    results.push(resultRow);
  });

  return results;
}

function Table<T>(row: number, col: number, fill?: T) {
  return Array.from(Array(row), (_) => Array(col).fill(fill));
}

function algorithmC(results: Result[][]): (Result | undefined)[][] {
  const col = 6;
  const row = 34;

  const table = Table(row, col);

  results.slice(0, row).forEach((row, _rowIndex) => {
    let rowIndex = _rowIndex;
    let colIndex = 0;

    row.forEach((result) => {
      table[rowIndex][colIndex] = result;

      if (colIndex > col || Boolean(table[rowIndex][colIndex + 1])) {
        rowIndex += 1;
      } else {
        colIndex += 1;
      }
    });
  });

  return table;
}

function algorithmD(table: (Result | undefined)[][]) {
  const results: ("red" | "blue" | undefined)[][] = [];
  let current: "red" | "blue" | undefined = undefined;

  for (let rowIndex = 1; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];

    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      if (!table[rowIndex][colIndex]) {
        if (current !== "blue") {
          current = "blue";

          results.push(["blue"]);

          break;
        }

        results[results.length - 1].push("blue");

        break;
      }

      const existed = Boolean(table[rowIndex - 1][colIndex]);
      if (existed) {
        if (current !== "red") {
          current = "red";

          results.push(["red"]);

          continue;
        }

        results[results.length - 1].push("red");
      }
    }
  }

  function toTable(results: ("red" | "blue" | undefined)[][]) {
    const col = 3;
    const row = 34;

    const table = Table(row, col);

    results.slice(0, row).forEach((_row, _rowIndex) => {
      let rowIndex = _rowIndex;
      let colIndex = 0;

      _row.forEach((result) => {
        if (rowIndex >= row) {
          return;
        }

        table[rowIndex][colIndex] = result;

        if (colIndex < col - 1 && !table[rowIndex][colIndex + 1]) {
          colIndex += 1;
        } else {
          rowIndex += 1;
        }
      });
    });

    return table;
  }

  return toTable(results);
}

function algorithmE(table: (Result | undefined)[][]) {
  const results: ("red" | "blue" | undefined)[][] = [];
  let current: "red" | "blue" | undefined = undefined;

  for (let rowIndex = 2; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];

    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      if (!table[rowIndex][colIndex]) {
        if (current !== "blue") {
          current = "blue";

          results.push(["blue"]);

          break;
        }

        results[results.length - 1].push("blue");

        break;
      }

      const existed = Boolean(table[rowIndex - 2][colIndex]);
      if (existed) {
        if (current !== "red") {
          current = "red";

          results.push(["red"]);

          continue;
        }

        results[results.length - 1].push("red");
      }
    }
  }

  function toTable(results: ("red" | "blue" | undefined)[][]) {
    const col = 3;
    const row = 17;

    const table = Table(row, col);

    results.slice(0, row).forEach((_row, _rowIndex) => {
      let rowIndex = _rowIndex;
      let colIndex = 0;

      _row.forEach((result) => {
        if (rowIndex >= row) {
          return;
        }

        table[rowIndex][colIndex] = result;

        if (colIndex < col - 1 && !table[rowIndex][colIndex + 1]) {
          colIndex += 1;
        } else {
          rowIndex += 1;
        }
      });
    });

    return table;
  }

  return toTable(results);
}

function algorithmF(table: (Result | undefined)[][]) {
  const results: ("red" | "blue" | undefined)[][] = [];
  let current: "red" | "blue" | undefined = undefined;

  for (let rowIndex = 3; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];

    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      if (!table[rowIndex][colIndex]) {
        if (current !== "blue") {
          current = "blue";

          results.push(["blue"]);

          break;
        }

        results[results.length - 1].push("blue");

        break;
      }

      const existed = Boolean(table[rowIndex - 3][colIndex]);
      if (existed) {
        if (current !== "red") {
          current = "red";

          results.push(["red"]);

          continue;
        }

        results[results.length - 1].push("red");
      }
    }
  }

  function toTable(results: ("red" | "blue" | undefined)[][]) {
    const col = 3;
    const row = 17;

    const table = Table(row, col);

    results.slice(0, row).forEach((_row, _rowIndex) => {
      let rowIndex = _rowIndex;
      let colIndex = 0;

      _row.forEach((result) => {
        if (rowIndex >= row) {
          return;
        }

        table[rowIndex][colIndex] = result;

        if (colIndex < col - 1 && !table[rowIndex][colIndex + 1]) {
          colIndex += 1;
        } else {
          rowIndex += 1;
        }
      });
    });

    return table;
  }

  return toTable(results);
}

export const BigRoadAlgorithm = pipe(algorithmA, algorithmB, algorithmC);
export const BigEyeAlgorithm = pipe(BigRoadAlgorithm, algorithmD);
export const SmallRoadAlgorithm = pipe(BigRoadAlgorithm, algorithmE);
export const CockroachRoadAlgorithm = pipe(BigRoadAlgorithm, algorithmF);
