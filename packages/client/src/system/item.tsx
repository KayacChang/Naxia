import { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";

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

  useEffect(() => {
    if (status !== "success") return;

    console.log(data);
  }, [status]);

  return <>{children}</>;
}
