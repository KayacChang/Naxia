import { Dungeon } from "./dungeon";

export interface Area {
  id: string;
  name: string;
  img: string;
  dungeons: Dungeon["id"][];
}
