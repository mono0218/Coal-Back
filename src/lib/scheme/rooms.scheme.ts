import {z} from "@hono/zod-openapi";

export const getRoomResponseScheme = z.object({
    token: z.string().openapi({
        example: "Example JWT Token"
    }),
    uuid: z.string().openapi({
        example: "Example UUID"
    }),
    name: z.string().openapi({
        example: "Room Name"
    })
}).openapi("GetRoomScheme");

export const postRoomRequestScheme = z.object({
    name: z.string().openapi({
        example: "Room Name"
    }),
    to_uuid: z.string().openapi({
        example: "Example UUID"
    })
}).openapi("CreateRoomScheme");

export const postRoomResponseScheme = z.object({
    token: z.string().openapi({
        example: "Example JWT Token"
    }),
    uuid: z.string().openapi({
      example: "Example UUID"
    }),
    name: z.string().openapi({
        example: "Room Name"
    })
}).openapi("CreateRoomResponseScheme");

export const deleteRoomResponseScheme = z.object({
    message: z.string().openapi({
        example: "Room deleted"
    })
}).openapi("DeleteRoomScheme");
