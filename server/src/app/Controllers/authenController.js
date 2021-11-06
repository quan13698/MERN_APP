const argon2 = require('argon2');
const User = require('../Models/users');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })

    try {
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({ success: false, message: 'User already used' });

        const hashPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashPassword });
        await newUser.save();

        //token
        const accessToken = jwt.sign({ userId: newUser._id });
        res.json({success: true, message:'create successfully'})
    } catch (error) {

    }
}
module.exports = {
    register: register,
}