import { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import { Items, useDispatch } from "store";

function fetchItemList() {
  return fetch(`${process.env.REACT_APP_API}/items`)
    .then((res) => res.json())
    .then(({ data }) => data);
}

type ItemServiceProps = {
  children: ReactNode;
};
export default function ItemSerivce({ children }: ItemServiceProps) {
  const { status, data } = useQuery("items", fetchItemList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "success") return;

    dispatch(Items.actions.add(data));
  }, [status]);

  return <>{children}</>;
}
