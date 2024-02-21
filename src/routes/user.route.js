import express from 'express';
import * as userController from '../controllers/user.controller';
import {userAuth} from "../middlewares/auth.middleware";

const router = express.Router();

//route to create a new user
router.post('', userController.singUp);
//route to login a user
router.post('/login',userController.login);
//route to fogotPassWord
router.put('/forgotpassword',userController.forgotPassWord);
//route to reset Password
router.put('/resetpassword',userAuth,userController.resetPassWord);


export default router;
