export type LoginResponse = {
    username: string;
    token: string;
}

export type LoginRequest = {
    userName: string;
    password: string;
}

export type User = {
    id: string;
    userName: string;
}