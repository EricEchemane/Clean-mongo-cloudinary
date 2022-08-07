import { Router } from "express";
import makeCallback from "utils/makeCallback";
import userControllers from '@api/controllers/user.controllers';

const userRoutes = Router();

userRoutes.route('/').post(makeCallback(userControllers.createNewUser, false));

export default userRoutes;