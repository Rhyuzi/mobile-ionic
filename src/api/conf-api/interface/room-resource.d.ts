import { ICount, IPage } from './common'

export const enum RoomResourceState {
    NORMAL = 0,
    EXPIRED = 1,
    DEVICE_FROZEN = 2,
    PENDING_TO_HOST = 3,
    IN_PROGRESS = 4
}

export const enum RoomResourceType {
    DEVICE = 0,
    WEB_FREE = 1,
    WEB_PAID = 2,
    STATIC = 4
}

export interface IPlan extends IPage, ICount {
    data: IPlanData
}

export interface IPlanData {
    roomResourceState:
        | RoomResourceState.NORMAL
        | RoomResourceState.EXPIRED
        | RoomResourceState.DEVICE_FROZEN
        | RoomResourceState.PENDING_TO_HOST
        | RoomResourceState.IN_PROGRESS
    roomResourceType:
        | RoomResourceType.DEVICE
        | RoomResourceType.WEB_FREE
        | RoomResourceType.WEB_PAID
        | RoomResourceType.STATIC
    maxAttendee: number
    roomResourceId: number
}