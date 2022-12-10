export interface IUser {
    _id: string,
    email: string,
    programs?: string[],
    accessToken: string,
}