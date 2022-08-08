import CreateUserUseCase from '@usecases/create-user.usecase';
import CreateUserLoginUseCase from '@usecases/user/user-login.usecase';
import { Request, Response } from 'express';
import environment from 'utils/environment';
import { RequestError } from 'utils/exceptions';
import Jwt from 'utils/jwt';

const userControllers = {
    createNewUser: async (req: Request) => {
        const { email, password } = req.body;
        const newUser = await CreateUserUseCase({ email, password })
            .execute()
            .catch(err => {
                throw new RequestError(400, err.message);
            });
        return newUser;
    },
    userLogin: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await CreateUserLoginUseCase({ email, password })
            .execute()
            .catch(err => {
                res.status(err.code).json(err);
                return;
            });

        const token = Jwt.sign(user, environment.secret);
        const session: any = req.session;
        session.user = token;
        res.status(200).end();
    }
};

export default userControllers;