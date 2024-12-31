import {z} from "@hono/zod-openapi";

export const getRoomResponseScheme = z.object({
    token: z.string().openapi({
        example: "Example JWT Token"
    })
})

export const postRoomRequestScheme = z.object({
    name: z.string().openapi({
        example: "Room Name"
    })
}).openapi("Create Room Scheme");

export const postRoomResponseScheme = z.object({
    token: z.string().openapi({
        example: "Example JWT Token"
    })
})

export const deleteRoomResponseScheme = z.object({
    message: z.string().openapi({
        example: "Room deleted"
    })
})