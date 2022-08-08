import User from "@entities/user.entity";
import { RequestError } from "utils/exceptions";

interface UserLoginInteractor {
    email: string;
    password: string;
}

export default function CreateUserLoginUseCase(interactor: UserLoginInteractor) {
    return {
        execute: async () => {
            const userExist = await User.findOne({ email: interactor.email });
            if (!userExist || !userExist.validPassword(interactor.password)) {
                throw new RequestError(401, "Invalid email or password");
            }
            let user = userExist.toObject();
            delete user.password;
            return user;
        }
    };
}