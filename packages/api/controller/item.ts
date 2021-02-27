import { Next, Request, Response } from "restify";
import * as Item from "../data/items";

export function getAll(req: Request, res: Response, next: Next) {
  res.send(Item.getAll());

  return next();
}
