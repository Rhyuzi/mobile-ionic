import sha256 from 'crypto-js/sha256'
import ConfApiHelper from './helpers'

const helpers = new ConfApiHelper()

export default async (endPoint: string, method: 'post' | 'get', payload?: any) => {
    const timeStamp = (new Date).getTime()
    
    const obj_param = {}
    const body_param = sha256(JSON.stringify(payload))
    const source_signature = helpers.applySign2(obj_param, timeStamp, body_param)

    const public_param = helpers.publicParam2(timeStamp)

    const param = ''
    const signature = '&signature='+source_signature;
    const url = endPoint + '?' + public_param + param + signature;

    return await helpers.sendApi(url, method, payload)
}
