import { Achievement, Item, User } from "types";
import { API, get, post, put } from "./base";

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

export interface GetUserAchievementResponse {
  data: {
    cart: Achievement[];
    other: Achievement[];
  };
  success: boolean;
}
export function getUserAchievement(token: string) {
  return get<GetUserAchievementResponse>(API("achievement"), token).then(
    ({ data }) => ({
      cart: data.cart.map((props) => ({
        ...props,
        done: props["is_done"],
        cardImg: props["card_img"],
      })),
      other: data.other.map((props) => ({
        ...props,
        done: props["is_done"],
        cardImg: props["card_img"],
      })),
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
