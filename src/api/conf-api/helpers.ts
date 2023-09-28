import sha256 from 'crypto-js/sha256'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { sortObject } from '@/utils/object'

type ObjectWithAccessToken = { accessToken?: string } & Record<string, string>
type HttpMethod = 'get' | 'post'

class ConfApiHelper {
    generateSignature(obj: ObjectWithAccessToken, bodyParam?: string): string {
        let data = '&'
        if (!obj.accessToken) delete obj.accessToken
        for (const key in obj) {
            data += `${key}=${obj[key]}&`
        }

        console.error('sign', `${data}${bodyParam}`)

        if (bodyParam) return sha256(`${data}${bodyParam}`).toString()
        else return sha256(data).toString()
    }

    generate_signature = (obj: any, body_param: any) => {
        let data = '&'
        if (!obj.accessToken) delete obj.accessToken
        for (let i = 0; i < Object.keys(obj).length; i++) {
            const a = Object.keys(obj)[i].toString()
            data += Object.keys(obj)[i] + '=' + obj[a] + "&"
        }
        
        if (body_param) {
            return sha256(data + body_param + '&')
        } else {
            return sha256(data)
        }
    }

    async sendApi<T = any>(endpoint: string, method: HttpMethod, data?: any): Promise<T> {
        const API_URI = `${process.env.VUE_APP_API_URL}/api/v1.0.0${endpoint}`

        // if (method === 'post') return await axios.post(API_URI, data)
        // else return await axios.get(API_URI)

        const requestConfig: AxiosRequestConfig = {
            url: API_URI,
            method
        }

        if (method === 'post') requestConfig.data = data

        try {
            const response = await axios(requestConfig)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) return error.response.data
            }

            throw error
        }
    }

    // send_api = async (endpoint: any, method: any, data: any) => {
    //     if (method === 'post') {
    //         return await axios.post(`${process.env.VUE_APP_API_URL}${endpoint}`, data)
    //     } else if (method === 'get') {
    //         return await axios.get(`${process.env.VUE_APP_API_URL}${endpoint}`, data)
    //     }
    // }

    publicParam2 = (timeStamp: number) => {
        let token = ''
        const accessToken = localStorage.getItem('accessToken') || ''
        if (accessToken) token = 'accessToken=' + accessToken + '&'
        return token + 'appID=' + process.env.VUE_APP_APP_ID + '&appSecret=' + process.env.VUE_APP_APP_SECRET + '&timeStamp=' + timeStamp
    }

    sortObj = (obj: any) => {
        return Object.keys(obj).sort().reduce((result, key) => Object.assign(result, { [key]: obj[key] }), {})
    }

    applySign2 = (obj_param:any, timeStamp:any, body_param: any) => {
        const appID = process.env.VUE_APP_APP_ID
        const appSecret = process.env.VUE_APP_APP_SECRET
        const accessToken = localStorage.getItem('accessToken') || ''
        const obj_public = {appID, appSecret, timeStamp, accessToken}
        const obj = Object.assign({}, obj_public, obj_param)
        const obj_sign = this.sortObj(obj)
        return this.generate_signature(obj_sign, body_param)
    }

    publicParam(timestamp: number) {
        let token = ''
        const accessToken = localStorage.getItem('accessToken') || ''
        const appID = process.env.VUE_APP_APP_ID
        const appSecret = process.env.VUE_APP_APP_SECRET
        if (accessToken) token = `accessToken=${accessToken}&`
        return `${token}appID=${appID}&appSecret=${appSecret}&timeStamp=${timestamp}`
    }

    applySign(objParam: any, timeStamp: number, bodyParam: string) {
        const accessToken = localStorage.getItem('accessToken') || ''
        const appID = process.env.VUE_APP_APP_ID
        const appSecret = process.env.VUE_APP_APP_SECRET
        const publicObj = { accessToken, appID, appSecret, timeStamp }
        const obj = Object.assign({}, publicObj, objParam)
        const sortedObj = sortObject(obj)
        console.error('bodyParam 1', bodyParam)
        return this.generateSignature(sortedObj, bodyParam)
    }

    createParams(payload: Record<string, any>) {
        let params = ''

        for (const key in payload) {
            params += `&${key}=${payload[key]}`
        }

        return params
    }
}

export default ConfApiHelper
