import clsx from "clsx";
import Assets from "assets";

type CountCubePorps = {
  cubeClassName: string;
  color: string;
  role: string;
  count: number;
};
export function CountCube({
  cubeClassName,
  color,
  role,
  count,
}: CountCubePorps) {
  return (
    <div className="flex items-center"> 
      { role === '莊' &&
        <img
          className="p-2 pr-1"
          src={Assets.Room.Icon_Fire}
          alt="room frame big"
        />
      }
      { role === '閒' &&
        <img
          className="p-2 pr-1"
          src={Assets.Room.Icon_Ice}
          alt="room frame big"
        />
      }
      { role === '和' &&
        <img
          className="p-2 pr-1"
          src={Assets.Room.Icon_Wind}
          alt="room frame big"
        />
      }
      { role === '閒對' &&
        <img
          className="p-2 pr-1"
          src={Assets.Room.Icon_Light}
          alt="room frame big"
        />
      }
      { role === '莊對' &&
        <img
          className="p-2 pr-1"
          src={Assets.Room.Icon_Dark}
          alt="room frame big"
        />
      }
      <p className={clsx("px-4", color)}>{count}</p>
    </div>
  );
}