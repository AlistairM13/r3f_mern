import express from 'express'

import auth from '../middleware/auth-middleware.js'
import { login, register, getUserProfile, updateUserProfile } from "../controllers/user-controller.js"

const router = express.Router()

router.post("/", register)

router.post("/login", login)

router.route("/profile")
    .get(auth, getUserProfile)
    .put(auth, updateUserProfile)

export default router