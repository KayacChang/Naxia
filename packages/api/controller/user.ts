import { Next, Request, Response } from "restify";
import { BadRequestError, NotFoundError } from "restify-errors";
import * as Users from "../database/users";
import { draw } from "../utils";

const Error = {
  NotInclude: (param: string) =>
    new BadRequestError(`Required parameter ${param} is not present`),

  NotFound: (id: string) =>
    new NotFoundError(`Request user ${id} is not found`),
};

export function getByID(req: Request, res: Response, next: Next) {
  if (!req.params.id) {
    res.send(Error.NotInclude("id"));

    return next();
  }

  const user = Users.getByID(req.params.id);

  if (!user) {
    res.send(Error.NotFound(req.params.id));

    return next();
  }

  res.send(user);

  return next();
}

export function getRandom(req: Request, res: Response, next: Next) {
  const count = req.query.count || 1;

  const users = draw(Users.getAll(), count);

  res.send(users);

  return next();
}
