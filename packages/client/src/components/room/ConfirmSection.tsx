import IMG_CONFIRM from "assets/room/control/confirm-normal.png";
import IMG_REDO from "assets/room/control/redo-normal.png";
import IMG_CANCEL from "assets/room/control/cancel-normal.png";

export function ConfirmSection() {
  return (
    <div className="space-y-2 text-white flex flex-col font-noto">
      <button className="w-24 relative">
        <img src={IMG_CONFIRM} alt="confirm button" />

        <span className="absolute top-1/2 transform -translate-y-1/2 text-shadow">
          確認
        </span>
      </button>

      <button className="w-24 relative">
        <img src={IMG_CANCEL} alt="cancel button" />

        <span className="absolute top-1/2 transform -translate-y-1/2 text-shadow">
          歸零
        </span>
      </button>

      <button className="w-24 relative">
        <img src={IMG_REDO} alt="redo button" />

        <span className="absolute top-1/2 transform -translate-y-1/2 text-shadow">
          重複
        </span>
      </button>
    </div>
  );
}
