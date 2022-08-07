import CreateUserUseCase from '@usecases/create-user.usecase';
import { Request } from 'express';
import { RequestError } from 'utils/exceptions';

const userControllers = {
    createNewUser: async (req: Request) => {
        const { email, password } = req.body;
        const newUser = await CreateUserUseCase({ email, password })
            .execute()
            .catch(err => {
                throw new RequestError(400, err.message);
            });
        return newUser;
    }
};

export default userControllers;