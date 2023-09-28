import { ICommonResponse } from "./common";

export interface IMeetListPayload {
  pageSize: string;
  meetingState: string;
}

export interface IMResponse {
  data: Array;
  pageIndex: string;
  pageSize: string;
  totalCount: string;
  totalPageCount: string;
}

export interface IMeetListResponse extends ICommonResponse {
  data: IMResponse;
}

export interface IMeetingItem {
  duration: string;
  endDateTime: string;
  endDateVal: string;
  endTime: string;
  endTimeStamp: number;
  endTimeVal: string;
  hasOperationAuth: number;
  hostEamil: string;
  hostName: string;
  isCycle: number;
  isInviteed: number;
  meetingNum: string;
  meetingSerialNum: string;
  packageState: number;
  roomResourceId: string;
  startDateTime: string;
  startDateVal: string;
  startTime: string;
  startTimeStamp: number;
  startTimeVal: string;
  state: number;
  subject: string;
  timezone: string;
  type: number;
}
