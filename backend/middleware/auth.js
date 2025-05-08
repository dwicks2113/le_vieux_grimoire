const jwt = require('jsonwebtoken'); // Import JWT for token verification
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret'; // Use environment variable for secret key or default to '

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Get the token from the authorization header
        if (!token) { // Check if the token is present
            return res.status(403).json({ error: 'No token provided'}); // If not, throw an error
            console.log('JWT Verification Error:', error); // Log the error for debugging
        }
        
        const decodedToken = jwt.verify(token, SECRET_KEY); // Verify the token using the secret key
        const userId = decodedToken.userId; // Extract the user ID from the decoded token 
        req.auth = { userId }; // Attach the user ID to the request object for later use
        
        if (req.body.userId && req.body.userId !== userId) { // Check if the user ID in the request body matches the one in the token
            throw 'Invalid user'; // If not, throw an error
        }
        else {
            next(); // If everything is valid, proceed to the next middleware
        }
    }
    catch {
        res.status(401).json({ error: new Error('Invalid request!') }); // If there's an error, send a 401 response
    }
};