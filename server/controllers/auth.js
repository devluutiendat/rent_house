// controllers/auth.js
const db = require('../models/index');
const users = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { password, phone, name, avatar, type, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        console.log(db.User)
        const [user, created] = await db.User.findOrCreate({
            where: { phone },
            defaults: {
              phone,
              name,
              password: hashedPassword,
              avatar,
              role:type,
              email
            }
          });

        if (!created) {
            return res.json({
                status :409,
                message: 'user already exists',
                success : false
                }) // 409 Conflict
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            currentUsers : user.id,
            success: true,
            token,
            message: "register in successful",
        });
    } catch (error) {
        console.error(error); // Log the error
        next(error); // Pass the error to the error handler middleware
    }
};

const signIn = async (req, res, next) => {
    
    const { password, phone } = req.body;
    try {        
        const user = await db.User.findOne({ where: { phone } });

        if (!user) {
            return res.status(404).json({
                message: "password or user not found",
                success : false
            })
        }

        const matching = bcrypt.compareSync(password, user.password);
        if (!matching) {
            return res.status(401).json({
                message: "Password or user incorrect", 
                success : false
                })
        }
        const token = jwt.sign({ userId: user.id, role: user.role,name :user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            currentUsers :{ 
                name:user.name,
                userId : user.id,
                role:user.role,
                img: user.avatar
            },
            success: true,
            token,
            message: "Sign in successful",
        });
    } catch (error) {
        console.error(error); // Log the error
        next(error); // Pass the error to the error handler middleware
    }
};

module.exports = {
    register,
    signIn
};
