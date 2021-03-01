import { Next, Request, Response } from "restify";
import { BadRequestError, NotFoundError } from "restify-errors";
import { draw } from "../utils";
import * as Items from "../database/items";

const Error = {
  NotInclude: (param: string) =>
    new BadRequestError(`Required parameter ${param} is not present`),

  NotFound: (id: string) =>
    new NotFoundError(`Request item ${id} is not found`),
};

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const item = Items.getByID(req.params.id);

  if (!item) {
    res.send(Error.NotInclude(req.params.id));

    return next();
  }

  res.send(item);

  return next();
}

export function getAll(req: Request, res: Response, next: Next) {
  const items = Items.getAll();

  res.send(items);

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  const count = req.query.count || 1;

  const items = draw(Items.getAll(), count);

  res.send(items);

  return next();
}
