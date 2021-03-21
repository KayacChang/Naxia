import { ReactNode, useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { Dungeon, Area as TArea } from "types";
import { Area, useDispatch } from "store";

type IArea = Omit<TArea, "dungeons"> & { dungeons: string[] };

function fetchAreas() {
  return fetch(`${process.env.REACT_APP_API}/areas`)
    .then((res) => res.json())
    .then(({ data }) => data as IArea[]);
}

function fetchDungeonByID(id: string) {
  return fetch(`${process.env.REACT_APP_API}/dungeons/${id}`)
    .then((res) => res.json())
    .then(({ data }) => data as Dungeon[]);
}

type AreaServiceProps = {
  children: ReactNode;
};
export default function AreaSerivce({ children }: AreaServiceProps) {
  const dispatch = useDispatch();
  const { data: areas } = useQuery("areas", fetchAreas);
  const results = useQueries(
    !areas
      ? []
      : areas
          .flatMap(({ dungeons }) => dungeons)
          .map((id) => ({
            queryKey: ["dungeons", id],
            queryFn: () => fetchDungeonByID(id),
          }))
  );

  const done = results.every(({ isSuccess }) => isSuccess);
  const dungeons = results.map(({ data }) => data as Dungeon);

  useEffect(() => {
    if (!done || !areas) return;

    const deduplicatedDungeons = dungeons.reduce(
      (map, cur) => map.set(cur.id, cur),
      new Map()
    );

    const areasWithDungeons = areas.map((area) => ({
      ...area,
      dungeons: area.dungeons.map((id) => deduplicatedDungeons.get(id)),
    }));

    dispatch(Area.actions.add(areasWithDungeons));
  }, [done, dungeons, areas]);

  return <>{children}</>;
}
