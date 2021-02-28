import { useQuery } from "react-query";
import { Item } from "types";

function fetchItems(): Promise<Item[]> {
  return fetch("/items").then((res) => res.json());
}

export function useItems() {
  const { data } = useQuery("items", fetchItems);

  return data || [];
}
