import { Next, Request, Response } from "restify";
import { draw, Error, pick } from "../utils";
import * as Items from "../database/items";

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const item = Items.findByID(req.params.id);

  if (!item) {
    res.send(Error.NotInclude(`Item ${req.params.id}`));

    return next();
  }

  res.send({ data: item });

  return next();
}

export function getAll(req: Request, res: Response, next: Next) {
  const items = Items.all();

  res.send({ data: items });

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  if (req.query.count > 1) {
    const items = draw(Items.all(), req.query.count);

    res.send({ data: items });
  }

  const user = pick(Items.all());

  res.send({ data: user });

  return next();
}
