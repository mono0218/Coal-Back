import { createRoute } from "@hono/zod-openapi";
import {
    GetUserByIdResponseScheme,
    updateUserRequestScheme,
    updateUserResponseScheme
} from "../../lib/scheme/user.scheme";

export const getUserById = createRoute({
    method: "get",
    path: "/{id}",
    responses:{
        200:{
            content:{
                "application/json":{
                    schema:GetUserByIdResponseScheme
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
                    schema:GetUserByIdResponseScheme
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
                    schema:{
                        type:"object",
                        properties:{
                            message:{type:"string"}
                        }
                    }
                }
            },
            description:"Success"
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