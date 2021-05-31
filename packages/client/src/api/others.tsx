import { Ranking } from "types";
import { API, get } from "./base";

interface _StoreItem {
  id: number;
  name: string;
  category: "card" | "other";
  item_type: "item" | "point";
  item_name: string | null;
  item_count: number;
  item_img: string;
  requirements: {
    type: "point" | "item";
    count: number;
    item_id: number | null;
    item_name: string | null;
    accumulate: number;
  }[];
}
export interface GetStoreItemsResponse {
  data: {
    card: _StoreItem[];
    other: _StoreItem[];
  };
  success: boolean;
}
export function getStoreItems(token: string) {
  // TODO
  return get<GetStoreItemsResponse>(API(`stores/items`), token).then();
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
