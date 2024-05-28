import express from "express";
import { loginController, registerController, verifyController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register',registerController);
userRouter.get('/verify',verifyController);
userRouter.post('/login',loginController);

export default userRouter;