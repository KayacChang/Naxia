// @ts-ignore
import { MagicItems } from "fantasy-content-generator";
import { range, values } from "ramda";
import { Item } from "../model";
import { random } from "../utils";

function toItem(id: number, item: any): Item {
  return {
    id,
    name: item.formattedData.title,
    level: random.integer(0, 99),
    img: `/items/images/${String(id + 1).padStart(3, "0")}.png`,
    price: random.integer(0, 2000),
  };
}

const items: Record<string, Item> = range(0, 256).reduce((store, id) => {
  const item = MagicItems.generate();

  return { ...store, [item.seed]: toItem(id, item) };
}, {});

export function getAll() {
  return values(items);
}
