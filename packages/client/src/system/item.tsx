import { useNetwork, useSubscript } from "network";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector, Items } from "store";

type ItemServiceProps = {
  children: ReactNode;
};
export default function ItemSerivce({ children }: ItemServiceProps) {
  const items = useSubscript("repository");
  const send = useNetwork();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  // send
  useEffect(() => {
    if (items || !send || !id) {
      return;
    }

    send(
      JSON.stringify({
        type: "repository",
        id,
      })
    );
  }, [send, id]);

  useEffect(() => {
    items && dispatch(Items.actions.add(items));
  }, [items]);

  return <>{children}</>;
}
