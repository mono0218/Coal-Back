import {createRoute} from "@hono/zod-openapi";
import {ErrorResponse} from "../../lib/scheme/error.scheme";
import {
    addFriendResponseScheme, deleteFriendResponseScheme,
    getFriendListByIdResponseScheme,
    getFriendListResponseScheme
} from "../../lib/scheme/friends.scheme";

export const getFriendList = createRoute({
    method: "get",
    path:"/",
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