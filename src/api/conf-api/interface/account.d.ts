import { ICommonResponse } from './common'

export interface IAccountInfo {
    account: string
    email: string
    comment: string
    country: string
    enterpriseName: string
    timeZoneDesc: string
    timeZoneDescription: string
    timezone: string
    timezoneOffset: number
}

export interface ISignInParams {
    account: string
    password: string
}

export interface ICredentials {
    accessToken: string
    sipAccount: string
    sipPassword: string
}

export type ISignInResponse = ICredentials &
    Pick<IAccountInfo, 'account' | 'email'>

export interface IUpdateAccountInfo {
    comment: string
    email: string
    timezone: string
}

export interface IAccountResponse extends ICommonResponse {
    data: IAccountInfo
}
