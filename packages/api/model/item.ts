export interface Item {
  id: number;
  type: "card" | "chip";
  name: string;
  img: string;
  level: number;
  price: number;
}
