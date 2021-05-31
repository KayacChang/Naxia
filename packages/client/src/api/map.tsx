import {
  Map,
  Dungeon,
  Condition,
  Round,
  DungeonInfo,
  SkillSet,
  SkillOption,
  NPC,
} from "types";
import { API, get, post } from "./base";

export interface GetAllMapsResponse {
  data: {
    id: number;
    name: string;
    status: number;
    image_url: string;
  }[];
  success: boolean;
}
export function getAllMaps(token: string): Promise<Map[]> {
  return get<GetAllMapsResponse>(API("maps"), token)
    .then(({ data }) => data)
    .then((data) =>
      data.map(({ id, name, status, image_url }) => ({
        id,
        name,
        status,
        img: image_url,
      }))
    );
}

export interface GetAllDungeonsInMapResponse {
  data: {
    id: number;
    map_id: number;
    name: string;
    img: string;
    room_id: string;
    stream_link: string;
    location_x: number;
    location_y: number;
    isLock: boolean;
  }[];
  success: boolean;
}
export function getAllDungeonsInMap(
  token: string,
  mapID: number
): Promise<Dungeon[]> {
  return get<GetAllDungeonsInMapResponse>(API(`maps/${mapID}/dungeons`), token)
    .then(({ data }) => data)
    .then((data) =>
      data.map(
        ({
          id,
          name,
          img,
          room_id,
          stream_link,
          location_x,
          location_y,
          isLock,
        }) => ({
          id,
          name,
          img,
          room: room_id,
          stream: stream_link,
          location: { x: location_x, y: location_y },
          lock: isLock,
        })
      )
    );
}

export interface GetNPCInMapResponse {
  data: NPC;
  success: boolean;
}
export function getNPCInMap(token: string, mapID: number): Promise<NPC> {
  return get<GetNPCInMapResponse>(API(`maps/${mapID}/npc`), token).then(
    ({ data }) => data
  );
}

export interface GetConditionsByDungeonIDResponse {
  data: {
    type: "item" | "point";
    item_name: string | null;
    count: number;
    accumulate: number;
    is_reach: boolean;
  }[];
  success: boolean;
}
export function getConditionsByDungeonID(
  token: string,
  mapID: number,
  dungeonID: number
): Promise<Condition[]> {
  return get<GetConditionsByDungeonIDResponse>(
    API(`maps/${mapID}/dungeons/${dungeonID}/conditions`),
    token
  )
    .then(({ data }) => data)
    .then((data) =>
      data.map(({ type, item_name, count, accumulate, is_reach }) => ({
        type,
        item: item_name,
        count,
        accumulate,
        achieve: is_reach,
      }))
    );
}

export interface GetRoundsByDungeonIDResponse {
  data: {
    id: number;
    results: SkillOption[];
    created_at: string;
  }[];
  success: boolean;
}
export function getRoundsByDungeonID(
  token: string,
  mapID: number,
  dungeonID: number
): Promise<Round[]> {
  return get<GetRoundsByDungeonIDResponse>(
    API(`maps/${mapID}/dungeons/${dungeonID}/rounds`),
    token
  )
    .then(({ data }) => data)
    .then((data) =>
      data.map(({ id, results }) => ({
        id,
        results,
      }))
    );
}

export interface GetInfoByDungeonIDResponse {
  data: {
    id: number;
    map_id: number;
    name: string;
    img: string;
    room_id: string;
    stream_link: string;
    bet_options: number[];
    skill_options: SkillSet;
    location_x: number;
    location_y: number;
    isLock: boolean;
  };
  success: boolean;
}
export function getInfoByDungeonID(
  token: string,
  mapID: number,
  dungeonID: number
): Promise<DungeonInfo> {
  return get<GetInfoByDungeonIDResponse>(
    API(`maps/${mapID}/dungeons/${dungeonID}/info`),
    token
  )
    .then(({ data }) => data)
    .then(
      ({
        id,
        name,
        img,
        room_id,
        stream_link,
        bet_options,
        skill_options,
        location_x,
        location_y,
        isLock,
      }) => ({
        id,
        name,
        img,
        room: room_id,
        stream: stream_link,
        location: { x: location_x, y: location_y },
        bets: bet_options,
        skills: {
          banker: skill_options.banker,
          player: skill_options.player,
          tie: skill_options.tie,
          bank_pair: skill_options.bank_pair,
          player_pair: skill_options.player_pair,
        },
        lock: isLock,
      })
    );
}

export interface UnlockResponse {
  data: {
    id: number;
    map_id: number;
    name: string;
    img: string;
    room_id: string;
    stream_link: string;
    location_x: number;
    location_y: number;
    is_lock: boolean;
  };
  success: boolean;
}
export function unlock(token: string, mapID: number, dungeonID: number) {
  return post<UnlockResponse>(
    API(`maps/${mapID}/dungeons/${dungeonID}/unlock`),
    {},
    token
  ).then(({ data }) => data);
}
