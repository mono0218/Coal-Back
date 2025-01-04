import {Hono} from "hono";
import { WebhookReceiver } from 'livekit-server-sdk';


export const LivekitRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>();
type Bindings = {
    DATABASE_URL: string
    LIVEKIT_API_KEY: string
    LIVEKIT_API_SECRET: string
}

LivekitRoute.post("/livekit",async (c) => {
    const receiver = new WebhookReceiver(c.env.LIVEKIT_API_KEY, c.env.LIVEKIT_API_SECRET);
    const event = await receiver.receive(await c.req.text(),"",true);
    if (event.event === 'room_started') {
        console.log('Room started', event.room?.sid);
    }else if (event.event === 'room_finished') {
        console.log('Room finished', event.room?.sid);
    }

    return c.json({status: "Received"});
})
