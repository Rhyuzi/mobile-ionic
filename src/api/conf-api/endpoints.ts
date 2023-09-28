'use strict'

// GET TIMEZONES
const TIMEZONES = '/common/timezones' // method get

// ACCOUNT RELATED INTERFACE
const ACCOUNT_LOGIN = '/account/login' // method get
const ACCOUNT_LOGOUT = '/account/logout' // method get
const ACCOUNT_INFO = '/account/info' // metho get & post

// TEMPLATE RELATED
const GET_PLANS = '/room/resource/list' // method get
const MEETING_TEMPLATE_DETAIL = '/template/instance/detail' // method get
const PUBLIC_TEMPLATE_DETAIL = '/template/public/detail' // method get
const UPDATE_METTING_TEMPLATE = '/template/instance/edit' // methos post
const UPDATE_PUBLIC_TEMPLATE = '/template/public/edit' // method post

// CONFERENCE MANAGEMENT RELATED INTERFACE
const CONFERENCE_LIST = '/room/list' // method get
const INSTANT_MEETING = '/room/quick_start' // method post
const SCHEDULE_MEETING = '/room/schedule' // method post
const MEETING_DETAIL = '/room/detail' // method get
const MEETING_DETAIL_ATTEND_LIST = '/meeting/attendList' // method get
const OPEN_MEETING = '/meeting/open' // method post
// const OPEN_MEETING =  '/room/launch' // method post
const EDIT_MEETING = '/room/edit' // method post
const QUICK_MEETING = '/meeting/quick_start' //method post
const MEETING_PLANS = '/meeting/get_plans' //method get
const CANCEL_MEETING = '/room/cancel' // method post
const END_MEETING = '/room/end' // method post
const DELETE_MEETING = '/room/delete' // method post

// CONTACTS RELATED
const CONTACT_DEPARTEMENTS = '/contact/department' // method get
const CONTACT_USERS = '/contact/users' // method get
const GET_CONTACTS_BY_DEPT_ID = '/contact/get_contacts_by_departmentIds' // method post

export {
    MEETING_PLANS,
    QUICK_MEETING,
    TIMEZONES,
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
    ACCOUNT_INFO,
    GET_PLANS,
    MEETING_TEMPLATE_DETAIL,
    PUBLIC_TEMPLATE_DETAIL,
    UPDATE_METTING_TEMPLATE,
    UPDATE_PUBLIC_TEMPLATE,
    CONFERENCE_LIST,
    INSTANT_MEETING,
    SCHEDULE_MEETING,
    MEETING_DETAIL,
    MEETING_DETAIL_ATTEND_LIST,
    OPEN_MEETING,
    EDIT_MEETING,
    CANCEL_MEETING,
    END_MEETING,
    DELETE_MEETING,
    CONTACT_DEPARTEMENTS,
    CONTACT_USERS,
    GET_CONTACTS_BY_DEPT_ID
}

export default {
    MEETING_PLANS,
    QUICK_MEETING,
    TIMEZONES,
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
    ACCOUNT_INFO,
    GET_PLANS,
    MEETING_TEMPLATE_DETAIL,
    PUBLIC_TEMPLATE_DETAIL,
    UPDATE_METTING_TEMPLATE,
    UPDATE_PUBLIC_TEMPLATE,
    CONFERENCE_LIST,
    INSTANT_MEETING,
    SCHEDULE_MEETING,
    MEETING_DETAIL,
    MEETING_DETAIL_ATTEND_LIST,
    OPEN_MEETING,
    EDIT_MEETING,
    CANCEL_MEETING,
    END_MEETING,
    DELETE_MEETING,
    CONTACT_DEPARTEMENTS,
    CONTACT_USERS,
    GET_CONTACTS_BY_DEPT_ID
}
