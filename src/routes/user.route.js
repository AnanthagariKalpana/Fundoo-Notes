import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { getUser } from '../services/user.service';

const router = express.Router();

//route to create a new user
router.post('/create', userController.newUser);
//route to login a user
router.post('/login',userController.login)
//route to get single user
router.get('/:email',userController.getUser);



export default router;
