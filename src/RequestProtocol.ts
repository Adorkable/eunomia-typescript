export const httpInsecure = "http"
export const httpSecure = "https"

export const webSocketInsecure = "ws"
export const webSocketSecure = "wss"

const requestProtocolString = (req?: any): string => {
    if (req) {
        if (req.headers["x-forwarded-proto"]) {
            return req.headers["x-forwarded-proto"]
        }

        if (req.secure) {
            return httpSecure
        }

        return httpInsecure
    }

    return window.location.protocol.slice(0, -1)
}

export const httpString = (req?: any): string => {
    return requestProtocolString(req)
}

export const webSocketString = (req?: any): string => {
    return requestProtocolString(req) === httpInsecure 
        ? webSocketInsecure 
        : webSocketSecure
}