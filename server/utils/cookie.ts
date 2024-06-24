import { type KeyObject, createHmac } from "node:crypto"

export type CookieSecret = string | Buffer | KeyObject

export function serialize(obj: object) {
    const value = Buffer.from(JSON.stringify(obj), "utf-8").toString("base64")
  
    if (Buffer.byteLength(value) > 4096)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad request",
        message: "Cookie too large",
      })
  
    return value
}

export function sign(value: string, secret: CookieSecret) {
    const signature = createHmac("sha256", secret).update(value).digest("base64").replace(/=+$/, "");
  
    return `${value}.${signature}`;
  }