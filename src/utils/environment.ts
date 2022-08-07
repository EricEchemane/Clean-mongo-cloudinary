import dotenv from "dotenv";
dotenv.config();

class Environment {
    isDevMode: boolean;
    port: number | string;
    secret: string;

    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;

    MONGODB_URI: string;

    constructor() {
        const env = process.env.NODE_ENV || "development";
        this.isDevMode = env === "development";
        this.port = this.isDevMode ? 4000 : process.env.PORT;
        this.secret = process.env.SECRET;
        this.CLOUD_NAME = process.env.CLOUD_NAME;
        this.API_KEY = process.env.API_KEY;
        this.API_SECRET = process.env.API_SECRET;
        this.MONGODB_URI = process.env.MONGODB_URI;
    }
}

const environment = new Environment();

export default environment;