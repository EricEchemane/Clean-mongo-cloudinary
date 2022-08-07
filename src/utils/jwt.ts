import jwt from 'jsonwebtoken';

export default class Jwt {

    static sign = (payload: any, secret: string) => {
        const token = jwt.sign(payload, secret);
        return token;
    };

    static verify = (token: string, secret: string) => {
        return jwt.verify(token, secret);
    };
}