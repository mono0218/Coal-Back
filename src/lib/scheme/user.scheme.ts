import {z} from "@hono/zod-openapi";

export const PutUserScheme = z.object({
    username: z.string().nullable().openapi({
        example: "John Doe"
    }),
    icon_url: z.string().nullable().openapi({
        example: "https://example.com/icon.png"
    }),
    status: z.string().nullable().openapi({
        example: "Free"
    })
}).openapi("Update User Scheme");