import { getUser, getUserItem } from "api";
import { useQueries } from "react-query";
import { User, Item } from "types";

export function useUser(token?: string) {
  const results = useQueries([
    {
      queryKey: ["user", token],
      queryFn: () => getUser(token!),
      enabled: Boolean(token),
    },
    {
      queryKey: ["user/item", token],
      queryFn: () => getUserItem(token!),
      enabled: Boolean(token),
    },
  ]);

  return {
    isSuccess: results.every(({ isSuccess }) => isSuccess),
    user: results[0].data as User,
    items: results[1].data as Item[],
  };
}
