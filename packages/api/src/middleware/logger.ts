import { RequestHandler } from "restify";

type Req = Parameters<RequestHandler>["0"];
type Res = Parameters<RequestHandler>["1"];
type Next = Parameters<RequestHandler>["2"];

export default function (req: Req, res: Res, next: Next) {
  const time = new Date(req.time());
  console.log(
    `[${time}] ${req.method} ${req.path()} HTTP/${req.httpVersion}`,
  );

  return next();
}
