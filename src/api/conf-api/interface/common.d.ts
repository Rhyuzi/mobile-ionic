export interface ICommonResponse {
    retCode: string
    timeStamp: string
    errorMsg?: string
}

export interface ITimezone {
    id: number
    timezoneId: string
    description: string
    offset: number
    timezone: string
}

export interface IPage {
    pageIndex: string
    pageSize: string
}

export interface ICount {
    totalCount: number
    totalPageCount: number
}
