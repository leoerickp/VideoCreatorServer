export interface inputNewUser {
    fullName: string;
    email: string;
    password: string;
    urlPhoto?: string;
    isActive?: boolean;
}

type partialUser = Partial<inputNewUser>

export interface inputUpdatedUser extends partialUser {
    id: string;
}

export interface IUser extends inputNewUser {
    id: string;
}