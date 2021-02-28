import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Item {
  id: number;
  img: string;
  level: number;
  name: string;
  price: number;
}

type ItemProps = Item & {
  onClick?: () => void;
};
function Item({ onClick, img }: ItemProps) {
  return (
    <button
      className="w-full h-14 bg-purple-500 relative text-white"
      onClick={onClick}
    >
      <img src={img} alt="items" />

      <span className="absolute bottom-0 right-0">X3</span>
    </button>
  );
}

type DetailProps = Item & {
  onConfirm?: () => void;
  onClose?: () => void;
};
function Detail({ name, img, onConfirm, onClose }: DetailProps) {
  return (
    <div className="text-white flex justify-center">
      <div className="flex flex-col space-y-2 absolute top-1/3 w-1/3">
        <div className="flex w-20 h-20 bg-white mx-auto">
          <img src={img} alt="items" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="bg-black bg-opacity-50">{name}</h3>

          <p className="bg-black bg-opacity-50">
            <span>Count: </span>
            <span>30</span>
          </p>
        </div>
      </div>

      <div className="p-4 space-x-4 flex justify-end absolute bottom-0 right-0">
        <Button className="bg-white text-black w-24" onClick={onConfirm}>
          Exchange
        </Button>
        <Button className="bg-white text-black w-24" onClick={onClose}>
          Back
        </Button>
      </div>
    </div>
  );
}

type ExchangeProps = Item & {
  onConfirm?: () => void;
  onClose?: () => void;
};
function Exchange({ name, onConfirm, onClose }: ExchangeProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white w-2/3 h-2/3 flex flex-col items-center p-4">
        <h3>Confirm</h3>
        <h4>{name}</h4>

        <form className="flex-1 flex flex-col justify-center">
          <div>
            <label htmlFor="count">Count</label>
            <input type="range" name="count" id="count" />
          </div>

          <div>
            <label htmlFor="points">Points</label>
            <input type="text" name="points" id="points" />
          </div>
        </form>

        <div className="flex justify-center space-x-4">
          <Button className="border" onClick={onClose}>
            Cancel
          </Button>
          <Button className="border" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

function fetchItems(): Promise<Item[]> {
  return fetch("/items").then((res) => res.json());
}

export default function Repo() {
  const [currentActive, setCurrentActive] = useState<Item | undefined>();
  const [openExchange, setOpenExchange] = useState(false);

  const { data } = useQuery("items", fetchItems);

  useEffect(() => {
    !currentActive && setOpenExchange(false);
  }, [currentActive]);

  return (
    <article className="bg-white w-full flex flex-col">
      <nav className="bg-blue-300">
        <Button>All</Button>
        <Button>Card</Button>
        <Button>Chip</Button>
      </nav>

      <section className="bg-pink-400 max-h-48 overflow-scroll  pointer-events-auto">
        <div className="grid grid-cols-5 gap-2 p-2">
          {data?.map((item) => (
            <Item
              key={item.id}
              onClick={() => setCurrentActive(item)}
              {...item}
            />
          ))}
        </div>
      </section>

      {data && currentActive && (
        <Modal>
          {openExchange || (
            <Detail
              {...currentActive}
              onConfirm={() => setOpenExchange(true)}
              onClose={() => setCurrentActive(undefined)}
            />
          )}

          {openExchange && (
            <Exchange
              {...currentActive}
              onClose={() => setCurrentActive(undefined)}
            />
          )}
        </Modal>
      )}
    </article>
  );
}
