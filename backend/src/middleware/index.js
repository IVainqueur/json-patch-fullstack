import jwt from "jsonwebtoken";
import { logger } from '../index.js';
import process from 'node:process';

const check_jwt = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error("Authorization header missing");
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        logger.error("[AUTH/CHECK_JWT] ", e.message)
        res.status(401).json({ error: e.message })
    }
}

export {
    check_jwt
}