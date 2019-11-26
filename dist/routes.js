"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
function router() {
    const rtr = express.Router();
    rtr.use("/", (req, res, next) => {
        res.locals.ip =
            req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress;
        res.locals.auth = req.headers.authorization;
        res.locals.timeout =
            Number(process.env.KEEP_ALIVE_MSECS) ||
                0;
        next();
    });
    rtr.get("/status", (req, res) => {
        res
            .status(200)
            .json({ response: "Server is up and running.", error: null });
    });
    return rtr;
}
exports.router = router;
//# sourceMappingURL=routes.js.map