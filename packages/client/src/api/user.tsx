import { Achievement, Item, User } from "types";
import { API, get, post, put } from "./base";

export interface LoginResponse {
  token: string;
  ttl: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export function login({ username, password }: LoginRequest) {
  return post<LoginResponse>(API("auth/login"), {
    username,
    password,
  });
}

export function getUser(token: string) {
  return get<User>(API("users"), token);
}

export function updateUser(token: string, user: User) {
  return put<User>(API("users"), token, user);
}

export function getUserItem(token: string) {
  return get<Item[]>(API("users/items"), token);
}

export interface GetUserAchievementResponse {
  cart: Achievement[];
  other: Achievement[];
}
export function getUserAchievement(token: string) {
  return get<GetUserAchievementResponse>(API("achievement"), token).then(
    ({ cart, other }) => ({
      cart: cart.map((props) => ({
        ...props,
        done: props["is_done"],
        cardImg: props["card_img"],
      })),
      other: other.map((props) => ({
        ...props,
        done: props["is_done"],
        cardImg: props["card_img"],
      })),
    })
  );
}

export interface BetResponse {
  status: "error" | "success";
  data: string;
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
  return post<BetResponse>(API("bet"), req, token);
}
