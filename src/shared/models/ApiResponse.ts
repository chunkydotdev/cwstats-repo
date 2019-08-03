export default interface ApiResponse<T> {
    result: T;
    isSuccessful: boolean;
    error: IError;
}

export interface IError {
    statusCode: number;
    message: string;
}
