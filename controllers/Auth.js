const User = require('../models/User');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const secret = "your-secret-key"; // Use a secure secret key

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email and password
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token for the new login session
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '30m' });

        // Invalidate the previous session by updating the user's token
        user.currentToken = token;
        await user.save();

        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Middleware to validate the session token
const validateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.userId);

        if (!user || user.currentToken !== token) {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        }

        req.user = user;
        next();
    });
};

module.exports = { login, validateToken };
