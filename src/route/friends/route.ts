import {createRoute} from "@hono/zod-openapi";
import {ErrorResponse} from "../../lib/scheme/error.scheme";
import {
    addFriendResponseScheme, deleteFriendResponseScheme,
    getFriendListByIdResponseScheme,
    getFriendListResponseScheme
} from "../../lib/scheme/friends.scheme";
import {idRequestParamsScheme} from "../../lib/scheme/lib.scheme";

export const getFriendList = createRoute({
    method: "get",
    path:"/",
    security: [
        {
            Bearer: [],
        },
    ],
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:getFriendListResponseScheme
                }
            },
            description:"Success"
        },
        404:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"User not found"
        },
        500:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const getFriendListById = createRoute({
    method: "get",
    path: "/{id}",
    security: [
        {
            Bearer: [],
        },
    ],
    request:{
        params: idRequestParamsScheme
    },
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:getFriendListByIdResponseScheme
                }
            },
            description:"Success"
        },
        404:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"User not found"
        },
        500:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const createFriend = createRoute({
    method: "post",
    path: "/{id}",
    security: [
        {
            Bearer: [],
        },
    ],
    request:{
        params: idRequestParamsScheme
    },
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:addFriendResponseScheme
                }
            },
            description:"Success"
        },
        404:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"User not found"
        },
        500:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const deleteFriend = createRoute({
    method: "delete",
    path: "/{id}",
    security: [
        {
            Bearer: [],
        },
    ],
    request:{
        params: idRequestParamsScheme
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: deleteFriendResponseScheme
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
            description: "User not found"
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