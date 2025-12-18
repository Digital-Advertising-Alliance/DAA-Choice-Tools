import { decodeAdPreferencesString } from './base64converter/decodeAdPreferencesString.js';

/**
 * Middleware to extract and decode ad preferences from request headers.
 * It looks for the 'X-AdChoices' or 'Cookie2' headers, decodes them,
 * and allows further logic to be applied.
 */
export const adPreferencesMiddleware = (req, res, next) => {
    // Retrieve ad preferences from 'X-AdChoices' or 'Cookie2' header
    const addPreferencesString = req.headers['x-adchoices'] || req.headers['cookie2'] || null;

    if (addPreferencesString) {
        // Decode the ad preferences string into an object
        const adPreferencesObject = decodeAdPreferencesString(addPreferencesString);

        // Apply logic based on the decoded preferences.
        // For example store it in req for use in later middleware or routes
        req.adPreferences = adPreferencesObject;
    }

    next(); // Proceed to the next middleware or route handler
};