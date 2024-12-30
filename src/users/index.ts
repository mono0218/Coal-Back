import { PrismaClient } from "@prisma/client";
import {Hono} from "hono";
import {HTTPException} from "hono/http-exception";

export const UserRoute = new Hono()
const prisma = new PrismaClient();

UserRoute.get("/:id", async (c) => {
    try {
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
    } catch (e) {
        return c.json({message: "Error"})
    }
})

UserRoute.put("/:id", async (c) => {
    try {
        const req = await c.req.json()
        const user = await prisma.user.update({
            where: {
                id: c.req.param("id")
            },
            data: {
                username: req.username,
                icon_url: req.icon_url,
                status: req.status
            }
        })

        return c.json({
            id: user.id,
            username: user.username,
            icon_url: user.icon_url,
            status: user.status
        },200)
    }catch (e) {
        throw new HTTPException(500, {message: "Internal Server Error"})
    }
})

UserRoute.delete("/:id", async (c) => {
    try{
        const result = await prisma.user.delete({
            where: {
                id: c.req.param("id")
            }
        })

        return c.json({message: "User deleted"},200)
    }catch (e) {
        throw new HTTPException(500, {message: "Internal Server Error"})
    }
})