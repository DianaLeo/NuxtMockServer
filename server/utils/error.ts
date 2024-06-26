import {H3Error} from "h3"

export function BadRequestError (statusText: string): H3Error {
    return createError({
        statusCode: 400,
        statusText
    })
}

export function UnauthorizedError (statusText: string): H3Error {
    return createError({
        statusCode: 401,
        statusText,
    })
}

export function InternalError (statusText: string): H3Error {
    return createError({
        statusCode: 500,
        statusText
    })
}