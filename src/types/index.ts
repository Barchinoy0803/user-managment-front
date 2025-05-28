export interface User {
    name?: string,
    email: string,
    password: string,
    id?: string
}

export interface ErrorType {
    status: number; 
    data: { message: string }
}