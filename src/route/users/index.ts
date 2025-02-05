import {HTTPException} from "hono/http-exception";
import {OpenAPIHono} from "@hono/zod-openapi";
import {deleteUser, getUser, getUserById, postFcmToken, updateUser} from "./route";
import {getPrismaClient} from "../../lib/prisma";

export const UserRoute =  new OpenAPIHono<{ Variables: {"user_id":string},Bindings:Bindings}>()
type Bindings = {
    DATABASE_URL: string
}

UserRoute.openapi(getUserById,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const { id } = c.req.valid("param")
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select:{
                id:true,
                username:true,
                icon_url:true,
                status:true,
                from_users:{
                    select:{
                        from_user:{
                            select:{
                                id:true,
                                username:true,
                                icon_url:true,
                                status:true,
                                created_at:true
                            }
                        }
                    }
                },
                to_users:{
                    select:{
                        to_user:{
                            select:{
                                id:true,
                                username:true,
                                icon_url:true,
                                status:true,
                                created_at:true
                            }
                        }
                    }
                },
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
            from_users: user.from_users.map((friend)=>{
                return friend.from_user
            }),
            to_users: user.to_users.map((friend)=>{
                return friend.to_user
            }),
            created_at: user.created_at
        },200)
    }
)

UserRoute.openapi(getUser,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const user_id = c.get("user_id")
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            },
            select:{
                id:true,
                username:true,
                icon_url:true,
                status:true,
                from_users:{
                    select:{
                        from_user:{
                            select:{
                                id:true,
                                username:true,
                                icon_url:true,
                                status:true,
                                created_at:true
                            }
                        }
                    }
                },
                to_users:{
                    select:{
                        to_user:{
                            select:{
                                id:true,
                                username:true,
                                icon_url:true,
                                status:true,
                                created_at:true
                            }
                        }
                    }
                },
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
            from_users: user.from_users.map((friend)=>{
                return friend.from_user
            }),
            to_users: user.to_users.map((friend)=>{
                return friend.to_user
            }),
            created_at: user.created_at
        },200)
    }
)

UserRoute.openapi(postFcmToken,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const user_id = c.get("user_id")
        const req = c.req.valid("json")
        await prisma.user.update({
            where: {
                id: user_id
            },
            data: {
                fcm_token: req.fcm_token
            }
        })

        return c.json({message: "Token updated"},200)
    }
)

UserRoute.openapi(updateUser,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
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
            status: user.status,
            created_at: user.created_at
        },200)
    }
)

UserRoute.openapi(deleteUser,
    async (c) => {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const user_id = c.get("user_id")
        await prisma.user.delete({
            where: {
                id: user_id
            }
        })

        return c.json({message: "User deleted"},200)
    }
)
