import endPoints from './endpoints'
import {
    IAccountInfo,
    IAccountResponse,
    ISignInParams,
    ISignInResponse,
    IUpdateAccountInfo
} from './interface/account'
import { ICommonResponse, IPage, ITimezone } from './interface/common'
import { IMeetListPayload, IMeetListResponse } from './interface/dashboard'
import { IPlan } from './interface/room-resource'

import request from './request'
import requestpost from './requestpost'

export async function getTimezones(): Promise<ICommonResponse & { data?: ITimezone }> {
    return await request(endPoints.TIMEZONES, 'get')
}

export async function signIn(
    payload: ISignInParams
): Promise<ICommonResponse & { data?: ISignInResponse }> {
    return await request(endPoints.ACCOUNT_LOGIN, 'get', payload)
}

export async function signOut(): Promise<ICommonResponse> {
    return await request(endPoints.ACCOUNT_LOGOUT, 'get')
}

export async function getAccountInfo(): Promise<ICommonResponse & { data?: IAccountInfo }> {
    return (await request(endPoints.ACCOUNT_INFO, 'get')) as IAccountResponse
}

export async function updateAccountInfo(payload: IUpdateAccountInfo): Promise<ICommonResponse> {
    return await request(endPoints.ACCOUNT_INFO, 'post', payload)
}

export async function getMeetingList(payload: IMeetListPayload): Promise<IMeetListResponse> {
    return await request(endPoints.CONFERENCE_LIST, 'get', payload)
}

export async function quickMeeing(payload: any): Promise<any> {
    return await requestpost(endPoints.QUICK_MEETING, 'post', payload)
}

export async function meetingPlans(payload: any): Promise<any> {
    return await request(endPoints.MEETING_PLANS, 'get', payload)
}

export async function getPlans(
    payload?: Partial<IPage>
): Promise<ICommonResponse & { data?: IPlan }> {
    return await request(endPoints.GET_PLANS, 'get', payload)
}
