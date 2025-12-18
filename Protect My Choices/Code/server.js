import express from 'express';
import {adPreferencesMiddleware} from './addPreferencesMiddleware.js';
const app = express();

// Route handler with ad preferences middleware
app.get('/', adPreferencesMiddleware, (req, res) => {
    res.json({
        message: "Ad preferences",
        preferences: req.adPreferences || "No preferences found"
    });
});

const PORT = 3000;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});