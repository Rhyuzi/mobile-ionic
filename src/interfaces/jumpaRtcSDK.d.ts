export interface CommonError {
    code: number
    description: string
}

export interface Data{
    [key: String]: UserData
}

export interface DataPlans{
    packages: packagesPlans[]
    pageNum: number,
    pageSize: number,
    totalCount: number,
    totalPageCount: number
}

export interface PackagesPlans{
    hostCode: string,
    maxJoin: number,
    name: string,
    password: string,
    roomIndex: string,
    roomState: number,
    roomType: number,
    theme: string
}

interface EventTypeEnum {
    EVENT_MEETING: string
    EVENT_JOIN_MEETING_SUCCESS: string
    EVENT_JOIN_MEETING_ERROR: string
    EVENT_CHAT_SYSTEM_MESSAGE_RECEIVED: string
    EVENT_CHAT_PRIVATE_MESSAGE_RECEIVED: string
    EVENT_CHAT_PANELIST_MESSAGE_RECEIVED: string
    EVENT_CHAT_GROUP_MESSAGE_RECEIVED: string
    EVENT_CHAT_FILE_MESSAGE_RECEIVED: string
    EVENT_CHAT_FILE_UPLOADED: string
    EVENT_MAIN_VIDEO_OPEN: string
    EVENT_MAIN_VIDEO_CLOSE: string
    EVENT_PRESENT_VIDEO_OPEN: string
    EVENT_PRESENT_VIDEO_CLOSE: string
    EVENT_CLOSE_SHARE_PRESENT_VIDEO: string
    EVENT_SPEECH_RECOGNITION_STACHANGE: string
    EVENT_SPEECH_RECOGNITION_INFO_HANDLER: string
    EVENT_DOCUMENT_STATUS_CHANGE: string
    EVENT_OPEN_DOCUMENT: string
    EVENT_WHITEBOARD_STATUS_CHANGE: string
    EVENT_MEETING_EXIT: string
    EVENT_MEETING_END: string
    EVENT_SPEECH_RECOGNITION_EXCEPTION: string
    EVENT_CHAT_STATUS_CHANGE: string
    EVENT_USERS_VIEW_STATUS_CHANGE: string
    EVENT_USER_NUMBER_CHANGE: string
    EVENT_RECORD_STATUS_CHANGE: string
    EVENT_MUTE_STATUS_CHANGE: string
    EVENT_RECORD_FAIL: string
    EVENT_ATTEND_ENABLE_LAYOUT_STATUS_CHANGE: string
    EVENT_INVITE_USERS_RESULT_RECEIVED: string
    EVENT_MEDIA_PLAYER_AUTOPLAY_PREVENTED: string
    EVENT_USER_HANDUP_STATUS_CHANGE: string
    EVENT_CAMERA_STATUS_CHANGE: string
    EVENT_USER_MIC_STATUS_CHANGE: string
    EVENT_MEETING_HOST_CHANGE: string
    EVENT_MEETING_PREPARATION_START: string
    EVENT_MEETING_START: string
    EVENT_SILENT_OUTPUT_DEVICE_DETECTED: string
    EVENT_MAIN_VIDEO_PLAYER_BIND_STREAM: string
    EVENT_PRESENT_VIDEO_PLAYER_BIND_STREAM: string
    EVENT_REMOTE_AUDIO_PLAYER_BIND_STREAM: string
    EVENT_SHARED_CAMERA_PREVIEW_BIND_STREAM: string
    EVENT_OPEN_CAMERA_PREVIEW_VIDEO_OPEN: string
    EVENT_OPEN_CAMERA_PREVIEW_VIDEO_CLOSE: string
    EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_BIND_STREAM: string
    EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_OPEN: string
    EVENT_USER_REMOVED_FROM_MEETING: string
    EVENT_MEDIA_NETWORK_STATE_CHANGE: string
}

export interface initOptions {
    sdkAppId: string
    sdkSecret: string
    userName?: string
    password?: string
}

export interface JoinRoomOptions {
    roomId: string
    userName: string
    email?: string
    hostCode?: string
    roomPassword?: string
}

interface LogLevelEnum {
    DEBUG: string
    LOG: string
    INFO: string
    WARN: string
    ERROR: string
}

interface LoggerFactory {
    getLogger: (param: any) => any
}

export interface PackLossRate {
    up: String
    down: String
}

export interface RoomInformation {
    meetingNum: string
    meetingTheme: string
    creator: string
    meetingTime: string
    startTime: string
    endTime: string
    timezone: string
    roomUrl: string
    isPresenting: boolean
    isWhiteboardSharing: string
    isVideoSharing: boolean
    canMaxJoin: string
    maxCameras: string
    confType: string
    mediaRegion: string
}

export interface UserData {
    camSta: string
    chatSta: string
    devType: string
    handup: string
    id: string
    layoutShow: string
    micSta: string
    name: string
    role: string
    usersViewSta: string
}

export interface UserInformation {
    camSta: string
    chatSta: string
    devType: string
    handup: string
    id: string
    isSelf: Boolean
    layoutShow: string
    micSta: string
    name: string
    role: string
    usersViewSta: string
}

interface VideoLayoutEnum {
    LAYOUT_PLAIN_2: string
    LAYOUT_PLAIN_4: string
    LAYOUT_PLAIN_9: string
    LAYOUT_PLAIN_16: string
    LAYOUT_PLAIN_25: string
    LAYOUT_PLAIN_36: string
    LAYOUT_PLAIN_49: string
    LAYOUT_AUTO: string
    LAYOUT_FOCUS_1_SMALL_3: string
    LAYOUT_FOCUS_1_SMALL_5: string
    LAYOUT_FOCUS_1_SMALL_7: string
    LAYOUT_FOCUS_1: string
    LAYOUT_SPEAKER: string
}

export interface JumpaRtcSDK
    extends VideoLayoutEnum,
        EventTypeEnum,
        LogLevelEnum {
    addEventHandler: (eventName: Pick<EventTypeEnum>, onEvent: (eventName: Pick<EventTypeEnum>, data: any) => void) => void
    closeLocalVideoPreview: (callback?: (err: CommonError) => void) => void
    closeRoom: (callback?: (err?: any) => void) => void
    exitRoom: (callback?: (err?: any) => void) => void
    getAudioDevices: (callback: (audioDevices: InputDeviceInfo[]) => void) => void
    getRoomInformation: () => RoomInformation
    getUserInfo: () => UserInformation
    getUserList: () => Data
    init: (options: initOptions, callback?: (err?: any) => void) => void
    joinRoom: (options: JoinRoomOptions, successCallback?: () => void, errorCallback?: (err: CommonError) => void) => void
    sendMessageToAll: (message: String, callback?: (err: Any) => void, file?: Any) => void
    sendMessageToUser: (message: String, userId: String, callback?: (err: Any) => void, file?: Any) => void
    setAudioDevice: (deviceId: string | getAudioDevices, callback?: (err: CommonError) => void) => void
    setServerAddr: (domain: string, callback?: (err?: any) => void) => void
    shareDesktop: (callback?: (err: CommonError) => void) => void
    shareDocument: (callback?: (err: CommonError) => void) => void
    shareWhiteBoard: (callback?: (err: CommonError) => void) => void
    stopLocalAudio: (callback?: (err: CommonError) => void) => void
    sendMainVideoStream: (deviceId: string,callback?: (err: CommonError) => void) => void
    stopSendMainVideoStream: (callback?: (err: CommonError) => void) => void
    stopShareDesktop: (callback?: (err: CommonError) => void) => void
    stopWhiteBoard: (callback?: (err: CommonError) => void) => void
    viewAudioPackLossRate: () => PackLossRate
    viewDemoVideoPackLossRate: () => PackLossRate
    viewVideoPackLossRate: () => PackLossRate
}

declare global {
    interface Window {
        jumpaRtcSDK: JumpaRtcSDK
    }
    const jumpaRtcSDK: JumpaRtcSDK
}
