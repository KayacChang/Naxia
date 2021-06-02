import React from "react";
import anime from "animejs";
import Assets from "assets";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useNPC } from "system";

export default function NPC() {
  const isStore = useRouteMatch("/lobby/store");
  const { img, name, dialog } = useNPC();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent(anime.random(0, dialog.length - 1)),
      10 * 1000
    );

    return () => void clearInterval(id);
  }, [dialog.length, setCurrent]);

  if (isStore?.isExact) return <></>;

  return (
    <div className="flex-1 relative px-2 flex items-end -my-14 xl:-my-24">
      <div className="absolute bottom-0 w-10/12">
        <img src={img} alt="npc" />
      </div>

      <div className="relative mb-20 lg:mb-1/4 xl:mb-1/6 flex justify-center items-center">
        <img src={Assets.Lobby.Dialog} alt="dialog" />

        <div className="absolute w-full h-full flex flex-col">
          <div className="absolute pl-8 md:pl-12 lg:pl-20 flex items-center h-1/4">
            <span className="text-fansy text-sm lg:text-2xl">{name}</span>
          </div>

          <div className="flex-1 mt-2 px-4 lg:px-8 flex items-center">
            <p className="text-xs lg:text-xl text-white">{dialog[current]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
