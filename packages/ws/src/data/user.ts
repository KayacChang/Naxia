const API = "http://localhost:3001";

export function getByID(id: string) {
  return fetch(`${API}/users/${id}`)
    .then((res) => res.json());
}
