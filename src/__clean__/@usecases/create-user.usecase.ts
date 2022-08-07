import User from "@entities/user.entity";

interface CreateUserInterActor {
    email: string;
    password: string;
}

export default function CreateUserUseCase(interactor: CreateUserInterActor) {
    return {
        execute: async () => {
            const user = new User(interactor);
            let newUSer: any = await user.save();
            newUSer = newUSer.toObject();
            delete newUSer.password;
            return newUSer;
        }
    };
}