import { AccessToken } from 'livekit-server-sdk';
import {HTTPException} from "hono/http-exception";
import {OpenAPIHono} from "@hono/zod-openapi";
import {createRoom, deleteRoom, getRoomById} from "./route";
import {getPrismaClient} from "../../lib/prisma";

export const RoomRoute =  new OpenAPIHono<{ Variables: {"user_id":string},Bindings:Bindings}>()
type Bindings = {
    DATABASE_URL: string
    LIVEKIT_API_KEY: string
    LIVEKIT_API_SECRET: string
}

RoomRoute.openapi(getRoomById,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const { id } = c.req.valid('param')
        const user_id = c.get("user_id")

        const room = await prisma.rooms.findUnique({
            where: {
                id: id
            }
        })

        if (!room) {
            throw new HTTPException(404, {message: "Room not found"})
        }

        const result = await prisma.user.findUnique({
            where: {
                id: user_id
            },
        })

        if (!result) {
            throw new HTTPException(404, {message: "User not found"})
        }

        const at = new AccessToken(c.env.LIVEKIT_API_KEY, c.env.LIVEKIT_API_SECRET, {
            identity: result.username,
            ttl: '10m',
        });

        at.addGrant({ roomJoin: true, room: id });

        return c.json({token: await at.toJwt()},200)
    }
)

RoomRoute.openapi(createRoom,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const room_id = crypto.randomUUID()
        const user_id = c.get("user_id")
        const req = c.req.valid('json')

        const result = await prisma.user.findUnique({
            where: {
                id: user_id
            },
        })

        if (!result) {
            throw new HTTPException(404, {message: "User not found"})
        }

        const at = new AccessToken(c.env.LIVEKIT_API_KEY, c.env.LIVEKIT_API_SECRET, {
            identity: result.username,
            ttl: '10m',
        });

        at.addGrant({roomJoin: true, room: room_id});

        await prisma.rooms.create({
            data: {
                id: room_id,
                name: req.name,
                owner: user_id,
                is_open: true,
            }
        })

        return c.json({
            token: await at.toJwt(),
            uuid: room_id
        },200)
    }
)

RoomRoute.openapi(deleteRoom, async (c) => {
    const prisma = getPrismaClient(c.env?.DATABASE_URL);
    const { id } = c.req.valid('param')
    const user_id = c.get("user_id")

    const room = await prisma.rooms.findUnique({
        where:{
            id: id,
        }
    })

    if (!room) {
        throw new HTTPException(404, {message: "Room not found"})
    }

    if (room.owner !== user_id) {
        throw new HTTPException(403, {message: "Forbidden"})
    }

    await prisma.rooms.delete({
        where:{
            id: id,
        }
    })

    return c.json({message: "Room deleted"},200)
})
