import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.route("/sign-up").post(signup);

authRouter.route("/sign-in").post(signin)

// authRouter.route("/sign-out").post(verifyJWT, signOut)

export default authRouter;