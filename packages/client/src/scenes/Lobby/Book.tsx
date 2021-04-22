import { Button, Modal } from "components";
import { useState } from "react";

type CardSlotProps = {
  onClick?: () => void;
};
function CardSlot({ onClick }: CardSlotProps) {
  return (
    <button onClick={onClick}>
      <div className="flex bg-white">
        <div>
          <img src="/items/images/001.png" alt="img" />
        </div>

        <div className="flex-1 flex">
          <h3 className="flex-1 text-left">Card Name</h3>

          <div className="px-2">
            <h4>Amount</h4>

            <p>x10</p>
          </div>
        </div>
      </div>
    </button>
  );
}

type CardDetailProps = {
  onClose?: () => void;
};
function CardDetail({ onClose }: CardDetailProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex-1"></div>

      <div className="flex-1">{/* <img src={CardIMG} alt="card" /> */}</div>

      <div className="flex-1 text-center text-white h-full flex flex-col justify-end p-2">
        <div className="space-y-1 h-1/3">
          <h3 className="bg-black bg-opacity-80">Card Name</h3>

          <p className="bg-black bg-opacity-80">
            <span>Count: </span>
            <span>30</span>
          </p>
        </div>

        <div className="flex justify-end">
          <Button className="w-1/2 bg-white text-black" onClick={onClose}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Book() {
  const [currentActive, setCurrentActive] = useState<string | undefined>();

  return (
    <article className="bg-white w-full flex flex-col">
      <nav className="bg-blue-300">
        <Button>Card</Button>
        <Button>Achievement</Button>
      </nav>

      <section className="bg-pink-400 max-h-48 overflow-scroll pointer-events-auto">
        <div className="flex flex-col p-2 divide-y">
          <CardSlot onClick={() => setCurrentActive("1")} />
          <CardSlot onClick={() => setCurrentActive("1")} />
          <CardSlot onClick={() => setCurrentActive("1")} />
          <CardSlot onClick={() => setCurrentActive("1")} />
          <CardSlot onClick={() => setCurrentActive("1")} />
        </div>
      </section>

      {currentActive && (
        <Modal>
          <CardDetail onClose={() => setCurrentActive(undefined)} />
        </Modal>
      )}
    </article>
  );
}
