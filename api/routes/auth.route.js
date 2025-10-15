import express from 'express';
import { signup, signin, googleAuth } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.route("/sign-up").post(signup);

authRouter.route("/sign-in").post(signin)

authRouter.route("/google").post(googleAuth)

// authRouter.route("/sign-out").post(verifyJWT, signOut)

export default authRouter;