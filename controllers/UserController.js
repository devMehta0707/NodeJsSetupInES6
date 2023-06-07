// WE WILL BIND OUR FUNCTIONS IN ASYNC-HANDLER WHICH WILL CREATES TRY CATCH BLOCK AUTOMATICALLY

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUND = 10;

// CHECK UNIQUE EMAIL ID FUNCTION

async function checkEmailAlreadyExist(email) {
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    return user;
}

// PASSWORD HASH FUNCTION

async function passwordHash(plainPassword) {
    const hashPass = await bcrypt.hash(plainPassword, SALT_ROUND);
    return hashPass;
}

// COMPARE PASSWORD FUNCTION

async function comparePassword(password, hashPassword) {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
}

// REGISTER FUNCTION

export const Register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }
    const { email, password } = req.body;
    const isExist = await checkEmailAlreadyExist(email);
    if (isExist) {
        return res.status(400).json({ msg: "Email id Already Exist" });
    }
    const hashPassword = await passwordHash(password);
    const result = await User.create({
        email: email,
        password: hashPassword
    });
    return res.status(200).json({
        msg: "Registered Successfully"
    })
})

// LOGIN FUNCTION

export const Login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }
    const { email, password } = req.body;
    const userExist = await User.findOne({
        where: { email: email }
    });
    if (userExist) {
        const passMatch = await comparePassword(password, userExist.password);
        if (passMatch) {
            const token = jwt.sign({ email: userExist.email, id: userExist.id }, SECRET_KEY);
            await User.update({
                token:token
            },{
                where:{id:userExist.id}
            })
            userExist.token = token;
            return res.status(200).json({ code: 200, msg: "Login Successfully", data: userExist, token: token })
        } else {
            return res.status(400).json({ code: 400, msg: "Invalid Credentials" })
        }
    } else {
        return res.status(400).json({ code: 400, msg: "User Not Exist" })
    }
})