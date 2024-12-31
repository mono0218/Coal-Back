import { PrismaClient } from "@prisma/client";
import {Hono} from "hono";
import {HTTPException} from "hono/http-exception";
import {zValidator} from "@hono/zod-validator";
import {PutUserScheme} from "../../lib/scheme/user.scheme";

export const UserRoute =  new Hono<{ Variables: {"user_id":string}}>();
const prisma = new PrismaClient();

UserRoute.get("/:id",
    async (c) => {
        const user = await prisma.user.findUnique({
            where: {
                id: c.req.param("id")
            }
        })

        if (!user) {
            throw new HTTPException(404, {message: "User not found"})
        }

        return c.json({
            id: user.id,
            username: user.username,
            icon_url: user.icon_url,
            status: user.status
        },200)
    }
)

UserRoute.get("/",
    async (c) => {
        const user_id = c.get("user_id")

        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        })

        if (!user) {
            throw new HTTPException(404, {message: "User not found"})
        }

        return c.json({
            id: user.id,
            username: user.username,
            icon_url: user.icon_url,
            status: user.status
        },200)
    }
)

UserRoute.put("/",
    zValidator("json", PutUserScheme, (result) => {
        if (!result.success) throw new HTTPException(400, {message: result.error.message})
    }),
    async (c) => {
        const user_id = c.get("user_id")
        const req = c.req.valid("json")
        const user = await prisma.user.update({
            where: {
                id: user_id
            },
            data: {
                username: req.username!,
                icon_url: req.icon_url!,
                status: req.status!
            }
        })

        return c.json({
            id: user.id,
            username: user.username,
            icon_url: user.icon_url,
            status: user.status
        },200)
    }
)

UserRoute.delete("/", async (c) => {
    const user_id = c.get("user_id")
    await prisma.user.delete({
        where: {
            id: user_id
        }
    })

    return c.json({message: "User deleted"},200)
})