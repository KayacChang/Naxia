import { getMarquee } from "api";
import Assets from "assets";
import { useEffect, useState } from "react";
import { selectToken, useAppSelector } from "system";
import invariant from "tiny-invariant";
import { wait } from "utils";

export function Marquee() {
  const token = useAppSelector(selectToken);
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    invariant(token, "Unauthorization");

    const duration = 20 * 1000;

    getMarquee(token)
      .then((list) =>
        Promise.all(
          list.map(({ content, interval }) => {
            setMessage(content);

            return wait(interval * duration);
          })
        )
      )
      .then(() => setMessage(undefined));
  }, [token, setMessage]);

  if (!message) return <></>;

  return (
    <div className="absolute transition-opacity">
      <div className="relative flex justify-center mt-4">
        <div className="w-1/2 relative flex items-center">
          <img
            src={Assets.Lobby.Marquee_Background}
            alt="marquee's background"
          />

          <div className="absolute w-full">
            <div className="relative flex items-center">
              <div className="w-1/8">
                <img src={Assets.Lobby.Marquee_Icon} alt="marquee's icon" />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-white font-kai transform animate-marquee">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
