import { Next, Request, Response } from "restify";
import { Error } from "../utils";
import * as Dungeon from "../database/dungeon";

export function getAll(req: Request, res: Response, next: Next) {
  res.send({ data: Dungeon.all() });

  return next();
}

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const dungeon = Dungeon.findByID(req.params.id);
  if (!dungeon) {
    res.send(Error.NotInclude(`Dungeon ${req.params.id}`));

    return next();
  }

  res.send({ data: dungeon });

  return next();
}
