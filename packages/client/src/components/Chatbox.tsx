import IMG_Frame from "assets/character/frame.png";

type ChatboxProps = {
  from: string;
  message: string;
};
export function Chatbox({ from, message }: ChatboxProps) {
  return (
    <div className="w-56 mt-auto mb-4 mx-2 text-white relative text-xs">
      <img src={IMG_Frame} alt="chatbox frame" />

      <h3 className="absolute top-0 w-20 py-1  flex justify-center ml-7">
        {from}
      </h3>

      <div className="absolute top-0 w-full h-full px-2 pt-4 pb-2">
        <p className="w-full h-full flex items-center justify-center">
          {message}
        </p>
      </div>
    </div>
  );
}
