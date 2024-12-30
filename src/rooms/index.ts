import { Hono } from "hono";

export const RoomRoute = new Hono()

RoomRoute.get("/:id", (c) => {
    return c.json({message: "Hello World"})
})

RoomRoute.post("/:id", (c) => {
    return c.json({message: "Hello World"})
})

RoomRoute.delete("/:id", (c) => {
    return c.json({message: "Hello World"})
})