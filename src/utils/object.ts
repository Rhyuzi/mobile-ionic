export function sortObject(obj: Record<string, any>): Record<string, any> {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => Object.assign(result, { [key]: obj[key] }), {})
}

export function isObject(obj: any): boolean {
    if (typeof obj === 'undefined') {
        obj = {}
        return true
    }
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}
