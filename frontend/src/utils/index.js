/**
 * This is a custom function that I created to validate the JSON patch string before sending it to the backend.
 * @param {string} patch_string JSON string of potential patch
 * @returns {boolean}
 */
const validatePatch = (patch_string) => {
    try {
        if (!patch_string) return false;
        const patch = JSON.parse(patch_string); // wrong input will throw an error
        if (!Array.isArray(patch)) return false;
        for (let p of patch) {
            if (!p.op || !p.path) return false;
            if (!['add', 'remove', 'replace', 'move', 'copy', 'test'].includes(p.op)) return false;
            if (!p.path.startsWith('/')) return false;
            if(['test', 'add', 'replace'].includes(p.op) && !p.value) return false;
            if(['move', 'copy'].includes(p.op) && !p.from) return false;
        }
        return true
    } catch (error) {
        return false
    }
}

export { validatePatch }