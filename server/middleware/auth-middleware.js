import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

import User from "../models/user-model.js"

const auth = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select("-password")

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized, invalid token")
        }
    } else {
        res.status(401)
        throw new Error("Not Authorized")
    }
})

export default auth