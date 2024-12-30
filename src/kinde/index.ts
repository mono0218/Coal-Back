import {PrismaClient} from '@prisma/client'
import {Hono} from "hono";
import {decodeWebhook} from "@kinde/webhooks";
import {HTTPException} from "hono/http-exception";


export const kindeRoute = new Hono();
const prisma = new PrismaClient();

kindeRoute.post("/kinde",async (c,next) => {
    try {
        const body = await c.req.text();
        const decodedWebhook = await decodeWebhook(body);

        if (decodedWebhook && decodedWebhook.type === "user.created") {
            await prisma.user.create({
                data:{
                    id:decodedWebhook.data.user.id,
                    username:decodedWebhook.data.user.username,
                    icon_url:"",
                    status:""
                }
            })

            return c.json({status: "Success"},200);
        }
    }catch (e) {
        throw new HTTPException(400,{message: "Error"});
    }
})