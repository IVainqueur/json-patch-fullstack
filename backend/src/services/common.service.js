const unknownEndpoint = (req, res) => {
    return res.status(404).json({ error: 'unknown endpoint' });
}

export {
    unknownEndpoint
}