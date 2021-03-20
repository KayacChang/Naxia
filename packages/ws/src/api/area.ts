import { API } from "../constants.ts";

export function getAllArea() {
  return fetch(`${API}/areas`)
    .then((res) => res.json())
    .then(({ data }) => data);
}
