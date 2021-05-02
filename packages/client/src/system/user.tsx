import { getUser, getUserItem, updateUser } from "api";
import { useMutation, useQueries, useQueryClient } from "react-query";
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
    user: results[0].data as User,
    items: results[1].data as Item[],
  };
}

export function useUserUpdate(token?: string) {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>((user) => updateUser(token!, user), {
    onSuccess: (data) => void queryClient.setQueryData(["user", token], data),
  });
}
