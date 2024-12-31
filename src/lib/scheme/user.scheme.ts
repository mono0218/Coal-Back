import {z} from "@hono/zod-openapi";

export const friendScheme = z.object({
    id: z.string().openapi({
        example: "1234567890"
    }),
    from_id: z.string().openapi({
        example: "1234567890"
    }),
    to_id: z.string().openapi({
        example: "1234567890"
    }),
    status: z.string().openapi({
        example: "friend"
    }),
    created_at: z.string().openapi({
        example: "2021-09-01T00:00:00Z"
    }),
    updated_at: z.string().openapi({
        example: "2021-09-01T00:00:00Z"
    })
}).openapi("FriendScheme");

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
    from_users: z.array(friendScheme).openapi({
        example: [{
            id: "1234567890",
            from_id: "1234567890",
            to_id: "1234567890",
            status: "friend",
            created_at: "2021-09-01T00:00:00Z",
            updated_at: "2021-09-01T00:00:00Z"
        }]
    }),
    to_users: z.array(friendScheme).openapi({
        example: [{
            id: "1234567890",
            from_id: "1234567890",
            to_id: "1234567890",
            status: "friend",
            created_at: "2021-09-01T00:00:00Z",
            updated_at: "2021-09-01T00:00:00Z"
        }]
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