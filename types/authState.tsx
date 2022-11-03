export type Role = 'owner' | 'admin' | 'user' | 'guest'

export interface IAuth {
    isAuth: boolean,
    roles: Role[]
}

export interface IUser {
    firstName?: string,
    lastName?: string,
    email: string
}

export interface IAuthUser {
    identifier: string,
    password?: string
}

export interface ITestAuth {
    isAuth: boolean,
    roles: Role[],
    firstName?: string,
    lastName?: string,
    email: string,
    id: string
}


export type SetAuthUser = (args: IAuthUser )=>Promise<void> 
