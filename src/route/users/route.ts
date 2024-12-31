import { createRoute } from "@hono/zod-openapi";
import {
    deleteUserResponseScheme,
    getUserByIdResponseScheme,
    updateUserRequestScheme,
    updateUserResponseScheme
} from "../../lib/scheme/user.scheme";
import {ErrorResponse} from "../../lib/scheme/error.scheme";

export const getUserById = createRoute({
    method: "get",
    path: "/{id}",
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
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"User not found"
        },
        500:{
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"Internal Server Error"
        }
    }
})


export const getUser = createRoute({
    method: "get",
    path:"/",
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
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"User not found"
        },
        500:{
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const updateUser = createRoute({
    method: "put",
    path:"/",
    request:{
        params: updateUserRequestScheme
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
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"Bad Request"
        },
        500:{
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"Internal Server Error"
        }
    }
})

export const deleteUser = createRoute({
    method: "delete",
    path: "/",
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