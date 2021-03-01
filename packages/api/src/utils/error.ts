import { BadRequestError, NotFoundError } from "restify-errors";

export const Error = {
  NotInclude: (param: string) =>
    new BadRequestError(`Required parameter ${param} is not present`),

  NotFound: (item: string) => new NotFoundError(`Request ${item} is not found`),
};
