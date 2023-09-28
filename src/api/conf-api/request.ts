import sha256 from 'crypto-js/sha256'
import ConfApiHelper from './helpers'

const helpers = new ConfApiHelper()

export default async (endPoint: string, method: 'post' | 'get', payload?: any) => {
    const timeStamp = Date.now()

    let objParam = {}

    let sourceSignature = ''
    let params = ''

    if (method === 'get') {
        if (payload) {
            objParam = payload
            params = helpers.createParams(payload)
        }

        sourceSignature = helpers.applySign(objParam, timeStamp, '')
    } else if (method === 'post') {
        const bodyParam = sha256(JSON.stringify(payload))
        sourceSignature = helpers.applySign(objParam, timeStamp, bodyParam.toString())
    }

    const publicParams = helpers.publicParam(timeStamp)

    const signature = `&signature=${sourceSignature}`

    endPoint += '?' + publicParams + params + signature

    return await helpers.sendApi(endPoint, method, payload)
}
