import * as express from "express";
import { Request, Response, NextFunction } from "express";

export function router(): express.Router {
  const rtr = express.Router();

  rtr.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.locals.ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress;
    res.locals.auth = req.headers.authorization;
    res.locals.timeout =
      Number(process.env.KEEP_ALIVE_MSECS) ||
      0;
    next();
  });

  rtr.get("/status", (req: Request, res: Response) => {
    res
      .status(200)
      .json({ response: "Server is up and running.", error: null });
  });

  return rtr;
}