import asyncHandler from 'express-async-handler'

import User from '../models/user-model.js'
import generateToken from '../utils/generate-token.js'

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })


    if (user && (await user.matchPassword(password))) {

        const token = generateToken(user._id)

        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: token
        })

    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    res.json({ message: "login" })
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
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
        const token = generateToken(user._id)

        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: token
        })

    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    }

    res.json(user)
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
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
    getUserProfile,
    updateUserProfile
}
