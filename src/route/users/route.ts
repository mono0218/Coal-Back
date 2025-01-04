import { createRoute } from "@hono/zod-openapi";
import {
    deleteUserResponseScheme,
    getUserByIdResponseScheme, postFcmTokenRequestScheme, postFcmTokenResponseScheme,
    updateUserRequestScheme,
    updateUserResponseScheme
} from "../../lib/scheme/user.scheme";
import {ErrorResponse} from "../../lib/scheme/error.scheme";
import {idRequestParamsScheme} from "../../lib/scheme/lib.scheme";

export const getUserById = createRoute({
    method: "get",
    path: "/{id}",
    security: [
        {
            Bearer: [],
        },
    ],
    request: {
        params: idRequestParamsScheme,
    },
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:getUserByIdResponseScheme
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


export const getUser = createRoute({
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
                    schema:getUserByIdResponseScheme
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

export const updateUser = createRoute({
    method: "put",
    path:"/",
    security: [
        {
            Bearer: [],
        },
    ],
    request:{
        body:{
            content:{
                "application/json":{
                    schema:updateUserRequestScheme
                }
            }
        }
    },
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:updateUserResponseScheme
                }
            },
            description:"Success"
        },
        400:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"Bad Request"
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

export const postFcmToken = createRoute({
    method: "post",
    path:"/fcm-token",
    security: [
        {
            Bearer: [],
        },
    ],
    request:{
        body:{
            content:{
                "application/json":{
                    schema:postFcmTokenRequestScheme
                }
            }
        }
    },
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:postFcmTokenResponseScheme
                }
            },
            description:"Success"
        },
        400:{
            content:{
                "application/json":{
                    schema:ErrorResponse
                }
            },
            description:"Bad Request"
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

export const deleteUser = createRoute({
    method: "delete",
    path: "/",
    security: [
        {
            Bearer: [],
        },
    ],
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:deleteUserResponseScheme
                }
            },
            description:"Success"
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
