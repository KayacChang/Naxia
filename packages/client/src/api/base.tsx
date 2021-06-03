import { join } from "path";

export const API = (...paths: string[]) =>
  new URL(join(...paths), process.env.REACT_APP_API).toString();

export function get<T>(url: string, authorization: string): Promise<T> {
  return fetch(url, {
    headers: {
      authorization: `Bearer ${authorization}`,
    },
  })
    .then((res) => res.json())
    .then(({ data, success, error }) => {
      if (!success) {
        throw new Error(error);
      }

      return data as T;
    })
    .catch((error) => Promise.reject(error));
}

export function post<T>(
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
  })
    .then((res) => res.json())
    .then(({ data, success, error }) => {
      if (!success) {
        return Promise.reject(error);
      }

      return data as T;
    })
    .catch((error) => Promise.reject(error));
}

export function put<T>(
  url: string,
  authorization: string,
  payload: any
): Promise<T> {
  return fetch(url, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${authorization}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(({ data, success, error }) => {
      if (!success) {
        throw new Error(error);
      }

      return data as T;
    })
    .catch((error) => Promise.reject(error));
}
