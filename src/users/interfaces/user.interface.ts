export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
    isStudent: boolean;
    password: string;
    accessToken?: string;
    refreshToken?: string;
}