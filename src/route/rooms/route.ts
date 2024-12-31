import {createRoute} from "@hono/zod-openapi";
import {
    deleteRoomResponseScheme,
    getRoomResponseScheme,
    postRoomRequestScheme,
    postRoomResponseScheme
} from "../../lib/scheme/rooms.scheme";
import {ErrorResponse} from "../../lib/scheme/error.scheme";

export const getRoomById = createRoute({
    method: "get",
    path: '/{id}',
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:getRoomResponseScheme
                }
            },
            description:"Success"
        },
        404:{
            content:{
                "application/json":{
                    schema: ErrorResponse
                }
            },
            description:"Room not found"
        },
        500:{
            content:{
                "application/json":{
                    schema: ErrorResponse
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const createRoom = createRoute({
    method: "post",
    path: "/",
    request: {
        params: postRoomRequestScheme
    },
    responses:{
        200:{
            content:{
                "application/json":{
                    schema: postRoomResponseScheme
                }
            },
            description:"Success"
        },
        400:{
            content:{
                "application/json":{
                    schema: ErrorResponse
                }
            },
            description:"Bad Request"
        },
        500:{
            content:{
                "application/json":{
                    schema: ErrorResponse
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const deleteRoom = createRoute({
    method: "delete",
    path: "/{id}",
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: deleteRoomResponseScheme
                }
            },
            description: "Success"
        },
        404: {
            content: {
                "application/json": {
                    schema: ErrorResponse
                }
            },
            description: "Room not found"
        },
        403:{
            content:{
                "application/json":{
                    schema: ErrorResponse
                }
            },
            description:"Forbidden"
        },
        500: {
            content: {
                "application/json": {
                    schema: ErrorResponse
                }
            },
            description: "Internal Server Error"
        }
    }
})