import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Assets from "assets";
import { StoreItem } from "types";
import Item from "./Item";
import { Modal, Tab, SystemModal, Close } from "components";
import { exchange, ExchangeRequest, getStoreItems } from "api";
import {
  selectToken,
  useAppDispatch,
  useAppSelector,
  user,
  useUser,
  system,
} from "system";
import invariant from "tiny-invariant";
import { useHistory } from "react-router";

function useStoreItem() {
  const [store, setItems] = useState<{
    card: StoreItem[];
    other: StoreItem[];
  }>();

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    invariant(token, "Unauthorization");
    dispatch(system.loading(true));

    getStoreItems(token).then((res) => {
      dispatch(system.loading(false));
      setItems(res);
    });
  }, [token]);

  const onExchange = useCallback(
    (req: ExchangeRequest) => {
      invariant(token, "Unauthorization");

      return exchange(token, req)
        .then(() =>
          Promise.all([dispatch(user.sync()), dispatch(user.item.sync())])
        )
        .then(() => getStoreItems(token))
        .then(setItems);
    },
    [token, dispatch]
  );

  return { store, onExchange };
}

type StoreProps = {
  className: string;
};
export default function Store({ className }: StoreProps) {
  const history = useHistory();
  const { store, onExchange } = useStoreItem();
  const user = useUser();

  invariant(user, "Unauthorization");

  const filters = [
    { key: "card", label: "熱門商品" },
    { key: "other", label: "特殊兌換" },
  ];

  const [active, setActive] = useState(filters[0]);

  const [show, setOpen] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "absolute w-full h-full left-0 top-0 bg-black bg-opacity-50 flex justify-center items-center",
          className
        )}
      >
        <div className="flex justify-center w-2/3">
          <div className="relative flex items-center justify-center">
            <img src={Assets.Lobby.Store_Frame_Bg} alt="store frame bg" />

            <div className="absolute w-full h-full px-1/12 pt-1/12 pb-1/24">
              <div className="relative h-full">
                <nav className="flex">
                  {filters.map((tab) => (
                    <Tab
                      key={tab.key}
                      className="w-1/4"
                      label={tab.label}
                      normalImage={Assets.Lobby.Store_Tab_Disable}
                      activeImage={Assets.Lobby.Store_Tab_Enable}
                      active={tab.key === active.key}
                      onClick={() => setActive(tab)}
                    />
                  ))}
                </nav>

                <div
                  className={clsx(
                    "overflow-auto pointer-events-auto",
                    "h-5/6 flex flex-col items-center py-2",
                    "text-sm"
                  )}
                >
                  {store?.[active.key].map((item: StoreItem) => (
                    <Item
                      key={item.id}
                      item={item}
                      onExchange={() =>
                        onExchange({
                          store_id: Number(item.id),
                        }).then(() => setOpen(true))
                      }
                    />
                  ))}
                </div>

                <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black to-transparent" />

                <Close
                  className="absolute -top-10 -right-10"
                  onClick={() => history.push("/lobby")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {show && (
        <Modal onClose={() => setOpen(false)}>
          <SystemModal button="確認" onConfirm={() => setOpen(false)}>
            <p className="w-full h-full flex justify-center items-center text-white text-lg">
              交易完成
            </p>
          </SystemModal>
        </Modal>
      )}
    </>
  );
}
