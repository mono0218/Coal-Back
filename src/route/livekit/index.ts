import {Hono} from "hono";
import { WebhookReceiver } from 'livekit-server-sdk';
import {getPrismaClient} from "../../lib/prisma";


export const LivekitRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>();
type Bindings = {
    DATABASE_URL: string
    LIVEKIT_API_KEY: string
    LIVEKIT_API_SECRET: string
}

LivekitRoute.post("/livekit",async (c) => {
    const receiver = new WebhookReceiver(c.env.LIVEKIT_API_KEY, c.env.LIVEKIT_API_SECRET);
    const event = await receiver.receive(await c.req.text(),"",true);
    if (event.event === 'room_finished' || event.room) {
        if (!event.room) return c.json({status: "Received"});

        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        await prisma.rooms.delete({
            where:{
                id: event.room.sid
            }
        })
    }


    return c.json({status: "Received"});
})
