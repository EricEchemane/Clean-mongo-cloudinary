import bcrypt from 'bcryptjs';

export default class Hasher {

    static hash = (plainText: string) => {
        const salt = bcrypt.genSaltSync(7);
        return bcrypt.hashSync(plainText, salt);
    };

    static verify = (input: string, hash: string) => {
        return bcrypt.compareSync(input, hash);
    };
}