import { CustomError } from './custom-error';
export declare class JwtExpiredError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
