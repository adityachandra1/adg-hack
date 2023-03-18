// Auth Routes
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwtsecret";

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide email and password',
            status: 'Error',
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password',
                status: 'Error',
                error: 'Invalid Credentials',
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid email or password',
                status: 'Error',
                error: 'Invalid Credentials',
            });
        }

        const token = jwt.sign({ userId: user._id } , JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, status: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Something went wrong',
            status: 'Error',
            error: err,
        });
    }
};

module.exports = {
    login
};
