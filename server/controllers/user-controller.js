import asyncHandler from 'express-async-handler'

import User from '../models/user-model.js'
import generateToken from '../utils/generate-token.js'

// 📢 POST /api/users/auth
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })


    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id)

        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email
        })

    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    res.json({ message: "login" })
})

// 📢 POST /api/users
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        username,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email
        })

    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// 📢 POST /api/users/logout
const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.json({ message: "User logged out" })
})

// 🔒 GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    }

    res.json(user)
})

// 🔒 PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export {
    login,
    register,
    logout,
    getUserProfile,
    updateUserProfile
}
