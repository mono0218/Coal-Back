import {z} from "@hono/zod-openapi";

export const PostRoomScheme = z.object({
    name: z.string().openapi({
        example: "Room Name"
    })
}).openapi("Create Room Scheme");