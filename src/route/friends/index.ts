import {HTTPException} from "hono/http-exception";
import {OpenAPIHono} from "@hono/zod-openapi";
import {createFriend, deleteFriend, getFriendList, getFriendListById} from "./route";
import {getPrismaClient} from "../../lib/prisma";

export const FriendRoute =  new OpenAPIHono<{ Variables: {"user_id":string}}>();
const prisma = getPrismaClient();

FriendRoute.openapi(getFriendList,
    async (c) => {
        const user_id = c.get("user_id")
        const result = await prisma.friends.findMany({
            where: {
                from_id: user_id
            },
            select:{
                id:true,
                to_user:{
                    select:{
                        id:true,
                        username:true,
                        icon_url:true,
                        created_at:true,
                        updated_at:true
                    }
                },
                status:true,
                created_at:true,
                updated_at:true,
            }
        })
        if (!result) throw new HTTPException(404, {message: "User not found"})
        return c.json(result,200)
    }
)

FriendRoute.openapi(getFriendListById,
    async (c) => {
        const { id } = c.req.valid("param")
        const result = await prisma.friends.findMany({
            where: {
                from_id: id
            },
            select:{
                id:true,
                to_user:{
                    select:{
                        id:true,
                        username:true,
                        icon_url:true,
                        created_at:true,
                        updated_at:true
                    }
                },
                status:true,
                created_at:true,
                updated_at:true,
            }
        })
        if (!result) throw new HTTPException(404, {message: "User not found"})
        return c.json(result,200)
    }
)

FriendRoute.openapi(createFriend,
    async (c) => {
        const { id } = c.req.valid("param")
        const user_id = c.get("user_id")

        const result = await prisma.friends.create({
            data: {
                from_id: user_id,
                to_id: id,
                status: "friend"
            }
        })

        return c.json(result,200)
    }
)

FriendRoute.openapi(deleteFriend,
    async (c) => {
        const { id } = c.req.valid("param")
        const user_id = c.get("user_id")

        await prisma.friends.deleteMany({
            where: {
                from_id: user_id,
                to_id: id
            }
        })

        return c.json({message: "friend deleted"},200)
    }
)