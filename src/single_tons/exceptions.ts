export class RequestError {
    success: boolean;
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
        this.success = false;
    }
}