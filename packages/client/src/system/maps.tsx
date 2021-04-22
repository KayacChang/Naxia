import {
  getAllDungeonsInMap,
  getAllMaps,
  getConditionsByDungeonID,
  getInfoByDungeonID,
  getRoundsByDungeonID,
} from "api";
import { useQueries, useQuery } from "react-query";
import { Condition, DungeonInfo, Round } from "types";

export function useMaps(token?: string) {
  return useQuery(["maps"], () => getAllMaps(token!), {
    enabled: Boolean(token),
  });
}

export function useDungeons(token?: string, mapID?: number) {
  return useQuery(
    ["dungeons", mapID],
    () => getAllDungeonsInMap(token!, mapID!),
    {
      enabled: Boolean(token && mapID),
    }
  );
}

export function useDungeon(token?: string, mapID?: number, dungeonID?: number) {
  const enabled = Boolean(token && mapID && dungeonID);

  const results = useQueries([
    {
      queryKey: ["dungeon/conditions", mapID, dungeonID],
      queryFn: () => getConditionsByDungeonID(token!, mapID!, dungeonID!),
      enabled,
    },
    {
      queryKey: ["dungeon/rounds", mapID, dungeonID],
      queryFn: () => getRoundsByDungeonID(token!, mapID!, dungeonID!),
      enabled,
    },
    {
      queryKey: ["dungeon/info", mapID, dungeonID],
      queryFn: () => getInfoByDungeonID(token!, mapID!, dungeonID!),
      enabled,
    },
  ]);

  const isCompleted = results.every(({ isSuccess }) => isSuccess);
  if (!isCompleted) return;

  return {
    conditions: results[0].data as Condition[],
    rounds: results[1].data as Round[],
    info: results[2].data as DungeonInfo,
  };
}
