import sessions from 'express-session';

export default function makeSession(secret: string) {
    return sessions({
        secret,
        saveUninitialized: true,
        // cookie: { maxAge: 1000 * 60 },
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false
    });
};