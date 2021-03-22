import { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import { Item, useDispatch } from "store";
import { Item as TItem } from "types";

function fetchItemList() {
  return fetch(`${process.env.REACT_APP_API}/items`)
    .then((res) => res.json())
    .then(({ data }) => data as TItem[]);
}

type ItemServiceProps = {
  children: ReactNode;
};
export default function ItemSerivce({ children }: ItemServiceProps) {
  const { status, data } = useQuery("items", fetchItemList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "success" || !data) return;

    dispatch(Item.actions.add(data));
  }, [status, data]);

  return <>{children}</>;
}
