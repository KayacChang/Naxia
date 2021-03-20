import { Dungeon } from "./dungeon";

export interface Area {
  id: string;
  name: string;
  image: string;
  dungeons: Dungeon["id"][];
}
