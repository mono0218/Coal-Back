import {Hono} from "hono";
import {decodeWebhook} from "@kinde/webhooks";
import {getPrismaClient} from "../../lib/prisma";


export const kindeRoute = new Hono();
const prisma = getPrismaClient();

kindeRoute.post("/kinde",async (c) => {
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
})