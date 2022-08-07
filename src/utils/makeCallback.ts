import { Request, Response } from "express";
import environment from "utils/environment";
import { RequestError } from "utils/exceptions";
import Token from "utils/jwt";

export interface AppRequest extends Request {
    user: any;
}

export default function makeCallback(controller: Function, protect = true) {

    return (req: AppRequest, res: Response) => {

        if (protect === true) {
            let session: any = req.session;

            if (session.user) {
                const token = session.user;
                if (!token) return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                    status: 401
                });
                req.user = Token.verify(token, environment.secret);
            }
            else return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                status: 401
            });
        }

        controller(req)
            .then((data: any) => {
                return res.json({
                    success: true,
                    code: 200,
                    data
                });
            })
            .catch((e: RequestError) => {
                console.error(e.message);
                return res.status(e.code || 500).json(e);
            });
    };
}