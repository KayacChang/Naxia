import { useQuery } from "react-query";
import { Item } from "types";

function fetchItems(): Promise<Item[]> {
  return fetch(`${process.env.REACT_APP_API}/items`).then((res) => res.json());
}

export function useItems() {
  const { data } = useQuery("items", fetchItems);

  return data || [];
}

export * from "./websocket";
