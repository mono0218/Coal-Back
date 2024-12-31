import {z} from "zod";

export const PutUserScheme = z.object({
    username: z.string().nullable(),
    icon_url: z.string().nullable(),
    status: z.string().nullable()
})