import { Router } from "express";
import makeCallback from "utils/makeCallback";
import userControllers from '@api/controllers/user.controllers';

const userRoutes = Router();

userRoutes.route('/').post(makeCallback(userControllers.createNewUser, false));
userRoutes.route('/login').post(userControllers.userLogin);

export default userRoutes;