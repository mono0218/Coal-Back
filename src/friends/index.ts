import { Hono } from "hono";

export const FriendRoute = new Hono()

FriendRoute.get("/", (c) => {
    return c.json({message: "Hello World"})
})

FriendRoute.post("/", (c) => {
    return c.json({message: "Hello World"})
})

FriendRoute.put("/", (c) => {
    return c.json({message: "Hello World"})
})

FriendRoute.delete("/", (c) => {
    return c.json({message: "Hello World"})
})