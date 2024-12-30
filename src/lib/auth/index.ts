import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import {HTTPException} from "hono/http-exception";

export async function jwtAuth(token:string){
    let user_id: string | (() => string) = ""

    const issuer = "https://monodevcloud-development.us.kinde.com/";

    const client = jwksClient({
        jwksUri:
            `${issuer}.well-known/jwks`,
    });

    function getKey(header: JwtHeader, callback: SigningKeyCallback) {
        if (!header.kid) throw new Error("not found kid!");
        client.getSigningKey(header.kid, function (err, key) {
            if (err) throw new HTTPException(500, {message: "Internal Server Error"});
            callback(null, key!.getPublicKey());
        });
    }

    jwt.verify(token, getKey, function (err, decoded) {
        if (err) throw new HTTPException(500, {message: "Internal Server Error"});

        if (decoded && decoded.sub) {
            user_id =  decoded.sub;
        }
    });

    return user_id;
}
