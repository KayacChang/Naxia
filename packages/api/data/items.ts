// @ts-ignore
import { MagicItems } from "fantasy-content-generator";
import { map, pipe, range, reduce, values } from "ramda";

interface Item {
  type: string;
  name: string;
  description: string;
}

function toItem(item: any): Item {
  return {
    type: item.type,
    name: item.formattedData.title,
    description: item.effects[0],
  };
}

const items: Record<string, Item> = pipe(
  range(0),
  map(() => MagicItems.generate()),
  reduce((store, item) => ({ ...store, [item.seed]: toItem(item) }), {}),
)(100);

export function getAll() {
  return values(items);
}
