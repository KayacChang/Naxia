import { Next, Request, Response } from "restify";
import * as History from "../database/history";

export function get(req: Request, res: Response, next: Next) {
  if (req.query.userID) {
    const records = History.findByUserID(req.query.userID);

    res.send({ data: records });

    return next();
  }

  res.send();

  return next();
}
