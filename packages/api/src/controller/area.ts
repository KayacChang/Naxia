import { Next, Request, Response } from "restify";
import { Error } from "../utils";
import * as Area from "../database/area";

export function getAll(req: Request, res: Response, next: Next) {
  res.send({ data: Area.all() });

  return next();
}

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const area = Area.findByID(req.params.id);
  if (!area) {
    res.send(Error.NotInclude(`Area ${req.params.id}`));

    return next();
  }

  res.send({ data: area });

  return next();
}
