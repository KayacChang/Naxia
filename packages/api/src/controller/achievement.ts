import { Next, Request, Response } from "restify";
import { Error } from "../utils";
import * as Achievements from "../database/achievements";

export function getAll(req: Request, res: Response, next: Next) {
  const achievements = Achievements.all();

  res.send({ data: achievements });

  return next();
}

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const achievement = Achievements.findByID(req.params.id);

  if (!achievement) {
    res.send(Error.NotInclude(`Achievement ${req.params.id}`));

    return next();
  }

  res.send({ data: achievement });

  return next();
}
