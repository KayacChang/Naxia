import { API } from "../constants.ts";

export function getUserByID(id: string) {
  return fetch(`${API}/users/${id}`)
    .then((res) => res.json())
    .then(({ data }) => data);
}
