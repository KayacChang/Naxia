import { ReactNode, useEffect } from "react";
import { useNetwork, useSubscript } from "network";
import { useSelector } from "store";

// type Context = {};

// type Event = { type: "FETCH" } | { type: "RESOLVE" };

// type State =
//   | {
//       value: "idle";
//       context: Context;
//     }
//   | {
//       value: "loading";
//       context: Context;
//     }
//   | {
//       value: "success";
//       context: Context;
//     };

// const machine = createMachine<Context, Event, State>({
//   id: "area",

//   initial: "idle",

//   states: {
//     idle: {
//       on: {
//         FETCH: "loading",
//       },
//     },
//     loading: {
//       on: {
//         RESOLVE: "success",
//       },
//     },
//     success: {
//       type: "final",
//     },
//   },
// });

type ServiceProps = {
  children: ReactNode;
};
export default function Area({ children }: ServiceProps) {
  const area = useSubscript("area");
  const send = useNetwork();
  const { id } = useSelector((state) => state.user);
  // send
  useEffect(() => {
    if (area || !send || !id) {
      return;
    }

    send(
      JSON.stringify({
        type: "area",
        id,
      })
    );
  }, [send, id]);

  useEffect(() => {
    console.log(area);
  }, [area]);

  return <>{children}</>;
}
