import {z} from "@hono/zod-openapi";

export const idRequestParamsScheme = z.object({
    id: z.string().openapi({
        param: {
            name: 'id',
            in: 'path',
        },
        example: "12345678-1234-1234-1234-123456789012",
    })
})