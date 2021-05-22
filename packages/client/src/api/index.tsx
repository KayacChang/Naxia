import { join } from "path";
import {
  User,
  Item,
  Map,
  Dungeon,
  Condition,
  Round,
  DungeonInfo,
  SkillSet,
  SkillOption,
  NPC,
} from "types";

const API = (...paths: string[]) =>
  new URL(join(...paths), process.env.REACT_APP_API).toString();

function get<T>(url: string, authorization: string): Promise<T> {
  return fetch(url, {
    headers: {
      authorization: `Bearer ${authorization}`,
    },
  }).then((res) => res.json());
}

function post<T>(
  url: string,
  payload: any,
  authorization?: string
): Promise<T> {
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(authorization ? { authorization: `Bearer ${authorization}` } : {}),
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

function put<T>(url: string, authorization: string, payload: any): Promise<T> {
  return fetch(url, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${authorization}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export interface LoginResponse {
  data: {
    token: string;
    ttl: string;
  };
  success: boolean;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export function login({ username, password }: LoginRequest) {
  return post<LoginResponse>(API("auth/login"), {
    username,
    password,
  }).then(({ data }) => data);
}

export interface GetUserResponse {
  data: User;
  success: boolean;
}

export function getUser(token: string) {
  return get<GetUserResponse>(API("users"), token).then(({ data }) => data);
}

export interface UpdateUserResponse {
  data: User;
  success: boolean;
}
export function updateUser(token: string, user: User) {
  return put<UpdateUserResponse>(API("users"), token, user).then(
    ({ data }) => data
  );
}

export interface GetUserItemResponse {
  data: Item[];
  success: boolean;
}
export function getUserItem(token: string) {
  return get<GetUserItemResponse>(API("users/items"), token).then(
    ({ data }) => data
  );
}

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
    is_lock: boolean;
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
          is_lock,
        }) => ({
          id,
          name,
          img,
          room: room_id,
          stream: stream_link,
          location: { x: location_x, y: location_y },
          lock: is_lock,
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
      data.map(({ id, results, created_at }) => ({
        id,
        results,
        createdAt: new Date(created_at),
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
    is_lock: boolean;
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
        is_lock,
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
        lock: is_lock,
      })
    );
}

export interface BetResponse {
  data: {
    status: "error" | "success";
    data: string;
  };
  success: boolean;
}
export interface BetRequest {
  room_id: string;
  uid: string;
  options: {
    cmd: string;
    val: number;
  }[];
}
export function bet(token: string, req: BetRequest) {
  return post<BetResponse>(API("bet"), req, token).then(({ data }) => data);
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
