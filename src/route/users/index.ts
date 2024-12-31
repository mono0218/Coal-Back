import { PrismaClient } from "@prisma/client";
import {HTTPException} from "hono/http-exception";
import {OpenAPIHono} from "@hono/zod-openapi";
import {deleteUser, getUser, getUserById, updateUser} from "./route";

export const UserRoute =  new OpenAPIHono<{ Variables: {"user_id":string}}>()

const prisma = new PrismaClient();

UserRoute.openapi(getUserById,
    async (c) => {
        const id = c.req.param("id")
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select:{
                id:true,
                username:true,
                icon_url:true,
                status:true,
                from_users:true,
                to_users:true,
                created_at:true,
            }
        })

        if (!user) {
            throw new HTTPException(404, {message: "User not found"})
        }

        return c.json({
            id: user.id,
            username: user.username,
            icon_url: user.icon_url,
            status: user.status,
            from_users: user.from_users,
            to_users: user.to_users,
            created_at: user.created_at
        },200)
    }
)

UserRoute.openapi(getUser,
    async (c) => {

        const user = await prisma.user.findUnique({
            where: {
                id: c.req.param("id")
            },
            select:{
                id:true,
                username:true,
                icon_url:true,
                status:true,
                from_users:true,
                to_users:true,
                created_at:true,
            }
        })

        if (!user) {
            throw new HTTPException(404, {message: "User not found"})
        }

        return c.json({
            id: user.id,
            username: user.username,
            icon_url: user.icon_url,
            status: user.status,
            from_users: user.from_users,
            to_users: user.to_users,
            created_at: user.created_at
        },200)
    }
)

UserRoute.openapi(updateUser,
    async (c) => {
        const user_id = c.get("user_id")
        const req = c.req.valid("param")
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
            status: user.status,
            created_at: user.created_at
        },200)
    }
)

UserRoute.openapi(deleteUser,
    async (c) => {
        const user_id = c.get("user_id")
        await prisma.user.delete({
            where: {
                id: user_id
            }
        })

        return c.json({message: "User deleted"},200)
    }
)