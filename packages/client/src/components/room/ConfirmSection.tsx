import IMG_CONFIRM from "assets/room/control/confirm-normal.png";
import IMG_REDO from "assets/room/control/redo-normal.png";
import IMG_CANCEL from "assets/room/control/cancel-normal.png";

export function ConfirmSection() {
  return (
    <div className="space-y-2">
      <div className="w-24">
        <img src={IMG_CONFIRM} alt="confirm button" />
      </div>

      <div className="w-24">
        <img src={IMG_REDO} alt="redo button" />
      </div>

      <div className="w-24">
        <img src={IMG_CANCEL} alt="cancel button" />
      </div>
    </div>
  );
}
