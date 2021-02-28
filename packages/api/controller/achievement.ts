import { Next, Request, Response } from "restify";
import * as Achievement from "../database/achievement";

export function getAll(req: Request, res: Response, next: Next) {
  res.send(Achievement.getAll());

  return next();
}
