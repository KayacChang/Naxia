import { Next, Request, Response } from "restify";

export function get(req: Request, res: Response, next: Next) {
  res.send("item");

  return next();
}
