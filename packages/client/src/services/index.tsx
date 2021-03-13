import { useNetwork, useSubscript } from "network";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector, Items, User } from "store";
import { useRouteMatch } from "react-router";

type ItemServiceProps = {
  children: ReactNode;
};
export function ItemSerivce({ children }: ItemServiceProps) {
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

type UserServiceProps = {
  children: ReactNode;
};
export function UserService({ children }: UserServiceProps) {
  const user = useSubscript("user");
  const dispatch = useDispatch();
  const send = useNetwork();
  const match = Boolean(useRouteMatch("/lobby"));

  useEffect(() => {
    if (!user && send && match) {
      send(
        JSON.stringify({
          type: "login",
          id: "07d07238-f5f5-4ead-b82e-dcc196580aaf",
        })
      );
      return;
    }

    user && dispatch(User.actions.login(user));
  }, [user, send, match]);

  return <>{children}</>;
}

type ErrorServiceProps = {
  children: ReactNode;
};
export function ErrorService({ children }: ErrorServiceProps) {
  const error = useSubscript("error");

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return <>{children}</>;
}
