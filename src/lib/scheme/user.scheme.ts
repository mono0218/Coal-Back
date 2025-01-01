import {z} from "@hono/zod-openapi";
export const UserScheme = z.object({
    id: z.string().openapi({
        example: "1234567890"
    }),
    username: z.string().openapi({
        example: "John Doe"
    }),
    icon_url: z.string().openapi({
        example: "https://example.com/icon.png"
    }),
    status: z.string().openapi({
        example: "Free"
    }),
    created_at: z.string().openapi({
        example: "2021-09-01T00:00:00Z"
    })
})

export const getUserByIdResponseScheme = z.object({
    id: z.string().openapi({
        example: "1234567890"
    }),
    username: z.string().openapi({
        example: "John Doe"
    }),
    icon_url: z.string().openapi({
        example: "https://example.com/icon.png"
    }),
    status: z.string().openapi({
        example: "Free"
    }),
    from_users: z.array(UserScheme).openapi({

    }),
    to_users: z.array(UserScheme).openapi({

    }),
    created_at: z.string().openapi({
        example: "2021-09-01T00:00:00Z"
    })
}).openapi("GetUserByIdScheme");

export const updateUserRequestScheme = z.object({
    username: z.string().nullable().openapi({
        example: "John Doe"
    }),
    icon_url: z.string().nullable().openapi({
        example: "https://example.com/icon.png"
    }),
    status: z.string().nullable().openapi({
        example: "Free"
    })
}).openapi("UpdateUserScheme");

export const updateUserResponseScheme = z.object({
    id: z.string().openapi({
        example: "1234567890"
    }),
    username: z.string().openapi({
        example: "John Doe"
    }),
    icon_url: z.string().openapi({
        example: "https://example.com/icon.png"
    }),
    status: z.string().openapi({
        example: "Free"
    }),
    created_at: z.string().openapi({
        example: "2021-09-01T00:00:00Z"
    })
}).openapi("UpdateUserScheme");

export const deleteUserResponseScheme = z.object({
    message: z.string().openapi({
        example: "User deleted"
    })
}).openapi("DeleteUserScheme");