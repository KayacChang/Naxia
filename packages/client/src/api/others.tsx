import { Marquee, Ranking, StoreItem } from "types";
import { API, get, post } from "./base";

export interface GetStoreItemsResponse {
  card: StoreItem[];
  other: StoreItem[];
}
export function getStoreItems(token: string) {
  return get<GetStoreItemsResponse>(API(`stores/items`), token);
}

export interface ExchangeResponse {
  data: "result";
}
export interface ExchangeRequest {
  store_id: number;
}
export function exchange(token: string, req: ExchangeRequest) {
  return post(API("exchange"), req, token);
}

export function getRank(token: string) {
  return get<Ranking>(API(`rank`), token).then(({ achievement, sp, exp }) => ({
    achievement: {
      data: achievement.data.map((record, index) => ({
        ...record,
        rank: index + 1,
      })),
      current: achievement.current,
      updated: achievement["updated_time"],
    },
    sp: {
      data: sp.data.map((record, index) => ({
        ...record,
        rank: index + 1,
      })),
      current: sp.current,
      updated: sp["updated_time"],
    },
    exp: {
      data: exp.data.map((record, index) => ({
        ...record,
        rank: index + 1,
      })),
      current: exp.current,
      updated: exp["updated_time"],
    },
  }));
}

export function getMarquee(token: string) {
  return get<Marquee[]>(API(`marquee`), token);
}
