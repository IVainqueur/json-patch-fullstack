import jsonpatch from 'jsonpatch'
import { logger } from '../index.js'

const patchService = (req, res) => {
    try {
        const { json, patch } = req.body;
        if (!json || !patch) throw new Error("JSON or patch missing or invalid");
        // validate json
        if (typeof json !== 'object') throw new Error("JSON is not an object");
        const patchedJson = jsonpatch.apply_patch(json, patch);
        logger.info("[PATCH/] ", "JSON patched successfully");
        return res.json({success: true, patched_output: patchedJson});
    } catch (e) {
        logger.error("[PATCH/] " + e.message)
        res.status(400).json({ error: e.message })
    }
}

export {
    patchService
}