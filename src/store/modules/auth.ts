/* eslint-disable no-async-promise-executor */
import { getAccountInfo, signIn, signOut } from '@/api/conf-api/api'
import {
    IAccountResponse,
    ISignInParams,
    ISignInResponse
} from '@/api/conf-api/interface/account'
import { ICommonResponse } from '@/api/conf-api/interface/common'
import md5 from 'crypto-js/md5'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
import { Commit } from 'vuex'

interface State {
    [key: string]: any
    accessToken: string
    account: string
    comment: string
    country: string
    email: string
    enterpriseName: string
    sipAccount: string
    sipPassword: string
    timeZoneDesc: string
    timeZoneDescription: string
    timezone: string
    timezoneOffset: string
    isAuth: boolean
}

const initialState: State = {
    accessToken: '',
    account: '',
    comment: '',
    country: '',
    email: '',
    enterpriseName: '',
    sipAccount: '',
    sipPassword: '',
    timeZoneDesc: '',
    timeZoneDescription: '',
    timezone: '',
    timezoneOffset: '',
    isAuth: false
}

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        SET(state: State, [key, value]: [string, any]) {
            state[key] = value
        },
        RESET(state: State) {
            Object.assign(state, initialState)
        }
    },
    getters: {
        get: (state: State) => (key: string) => state[key]
    },
    actions: {
        async signIn({ commit }: { commit: Commit }, payload: ISignInParams) {
            const { account, password } = payload
            const res = await signIn({
                account,
                password: String(md5(password))
            })

            if (res.retCode === '0') {
                const { accessToken, account, email, sipAccount, sipPassword } =
                    res.data as ISignInResponse
                commit('SET', ['accessToken', accessToken])
                commit('SET', ['account', account])
                commit('SET', ['email', email])
                commit('SET', ['sipAccount', sipAccount])
                commit('SET', ['sipPassword', sipPassword])
                commit('SET', ['isAuth', true])

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('account', account)
                localStorage.setItem('email', email)
                localStorage.setItem('user', JSON.stringify(res.data))
            }

            return res
        },
        async signOut({ commit }: { commit: Commit }) {
            const res = (await signOut()) as ICommonResponse

            localStorage.clear()
            commit('RESET')

            return res
        },
        async accountInfo({ commit }: { commit: Commit }) {
            const res = (await getAccountInfo()) as IAccountResponse
            if (res.retCode === '0') {
                const {
                    account,
                    comment,
                    country,
                    email,
                    enterpriseName,
                    timeZoneDesc,
                    timeZoneDescription,
                    timezone,
                    timezoneOffset
                } = res.data

                commit('SET', ['account', account])
                commit('SET', ['comment', comment])
                commit('SET', ['country', country])
                commit('SET', ['email', email])
                commit('SET', ['enterpriseName', enterpriseName])
                commit('SET', ['timeZoneDesc', timeZoneDesc])
                commit('SET', ['timeZoneDescription', timeZoneDescription])
                commit('SET', ['timezone', timezone])
                commit('SET', ['timezoneOffset', timezoneOffset])
            }

            return res
        }
        // async forgotPassword({ commit }: { commit: any }, payload: any) {
        //   return new Promise(async (resolve, reject) => {
        //     const res = await API.forgot_password(payload);
        //     const data = res.data;

        //     if (data.retCode === "0") {
        //       resolve(data);
        //     } else {
        //       reject(data);
        //     }
        //   });
        // },
    }
}
