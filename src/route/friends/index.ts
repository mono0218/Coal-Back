import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import {HTTPException} from "hono/http-exception";

export const FriendRoute =  new Hono<{ Variables: {"user_id":string}}>();
const prisma = new PrismaClient();
FriendRoute.get("/", async (c) => {
    const user_id = c.get("user_id")
    const result = await prisma.friends.findMany({
        where: {
            from_id: user_id
        }
    })
    if (!result) throw new HTTPException(404, {message: "User not found"})
    return c.json({data: result})
})

FriendRoute.get("/:id", async (c) => {
    const id = c.req.param("id")
    const result = await prisma.friends.findMany({
        where: {
            from_id: id
        }
    })
    if (!result) throw new HTTPException(404, {message: "User not found"})
    return c.json({data: result})
})

FriendRoute.post("/:id", async (c) => {
    const id = c.req.param("id")
    const user_id = c.get("user_id")

    const result = await prisma.friends.create({
        data: {
            from_id: user_id,
            to_id: id,
            status: "friend"
        }
    })

    return c.json({data: result})
})

FriendRoute.delete("/:id", async (c) => {
    const id = c.req.param("id")
    const user_id = c.get("user_id")

    await prisma.friends.deleteMany({
        where: {
            from_id: user_id,
            to_id: id
        }
    })

    return c.json({message: "Friend deleted"})
})