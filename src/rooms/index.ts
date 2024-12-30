import { Hono } from "hono";

export const RoomRoute = new Hono()

RoomRoute.get("/rooms", (c) => {
    return c.json({message: "Hello World"})
})

RoomRoute.post("/rooms", (c) => {
    return c.json({message: "Hello World"})
})

RoomRoute.put("/rooms", (c) => {
    return c.json({message: "Hello World"})
})

RoomRoute.delete("/rooms", (c) => {
    return c.json({message: "Hello World"})
})