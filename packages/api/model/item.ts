export interface Item {
  id: string;
  type: "card" | "chip";
  name: string;
  img: string;
  level: number;
  price: number;
}
