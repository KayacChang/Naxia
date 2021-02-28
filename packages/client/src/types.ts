export interface Item {
  id: number;
  type: "card" | "chip";
  img: string;
  level: number;
  name: string;
  price: number;
}
