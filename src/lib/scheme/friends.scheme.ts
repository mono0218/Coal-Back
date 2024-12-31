import { z } from "@hono/zod-openapi"

export const getFriendListResponseScheme = z.array(
    z.object({
        id: z.string(),
        to_user: z.object({
            id: z.string(),
            username: z.string(),
            icon_url: z.string(),
            created_at: z.string(),
            updated_at: z.string()
        }),
        status: z.string(),
        created_at: z.string(),
        updated_at: z.string()
    })
)

export const getFriendListByIdResponseScheme = z.array(
    z.object({
        id: z.string(),
        to_user: z.object({
            id: z.string(),
            username: z.string(),
            icon_url: z.string(),
            created_at: z.string(),
            updated_at: z.string()
        }),
        status: z.string(),
        created_at: z.string(),
        updated_at: z.string()
    })
)

export const addFriendResponseScheme = z.object({
    id: z.string(),
    from_id: z.string(),
    to_id: z.string(),
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string()
})

export const deleteFriendResponseScheme = z.object({
    message: z.string().openapi({
        example: "Friend deleted"
    })
})