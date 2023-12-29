import jwt from 'jsonwebtoken';
import { logger } from '../index.js';

const login = (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) throw new Error("Username or password missing or invalid");
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        logger.info("[AUTH/LOGIN] ",`User '${username}' logged in`);
        return res.json({ success: true, token });
    } catch (e) {
        logger.error("[AUTH/LOGIN] ",e.message)
        return res.status(400).json({ error: e.message });
    }
}
export {
    login,
}