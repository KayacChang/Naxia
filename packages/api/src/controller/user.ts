import { Next, Request, Response } from "restify";
import * as Users from "../database/users";
import { draw, Error, pick } from "../utils";

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const user = Users.findByID(req.params.id);

  if (!user) {
    res.send(Error.NotFound(`User ${req.params.id}`));

    return next();
  }

  res.send({ data: user });

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  if (req.query.count > 1) {
    const users = draw(Users.all(), req.query.count);

    res.send({ data: users });
  }

  const user = pick(Users.all());

  res.send({ data: user });

  return next();
}
