import dotenv from "dotenv";
dotenv.config();

class Environment {
    isDevMode: boolean;
    port: number | string;
    secret: string;

    constructor() {
        const env = process.env.NODE_ENV || "development";
        this.isDevMode = env === "development";
        this.port = this.isDevMode ? 4000 : process.env.PORT;
        this.secret = process.env.SECRET;
    }
}

const environment = new Environment();

export default environment;