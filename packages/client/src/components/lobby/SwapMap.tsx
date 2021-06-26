import Assets from "assets";
import { useAppDispatch, Map } from "system";

export function SwapMap() {
  const dispatch = useAppDispatch();
  return (
    <button
      className="absolute right-0 bottom-0 w-1/4 mb-12"
      onClick={() => dispatch(Map.next())}
    >
      <div className="relative flex items-center justify-end">
        <img src={Assets.Lobby.Swap_Background} alt="swap background" />

        <div className="absolute flex-1">
          <div className="flex items-center justify-end">
            <span className="text-xl font-kai text-fansy text-shadow-xl filter contrast-125">
              切換地圖
            </span>

            <div className="w-1/4">
              <img src={Assets.Lobby.Swap_Arrow} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
