import { Hono } from "hono";

export const FriendRoute = new Hono()

FriendRoute.get("/friends", (c) => {
    return c.json({message: "Hello World"})
})

FriendRoute.post("/friends", (c) => {
    return c.json({message: "Hello World"})
})

FriendRoute.put("/friends", (c) => {
    return c.json({message: "Hello World"})
})

FriendRoute.delete("/friends", (c) => {
    return c.json({message: "Hello World"})
})