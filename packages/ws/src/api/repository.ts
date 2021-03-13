import { API } from "../constants.ts";

export function getRepositoryByUserID(id: string) {
  return fetch(`${API}/users/${id}/items`)
    .then((res) => res.json())
    .then(({ data }) => data);
}
