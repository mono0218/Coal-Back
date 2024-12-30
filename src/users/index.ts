import {Hono} from "hono";

export const UserRoute = new Hono()

UserRoute.get("/users", (c) => {
    return c.json({message: "Hello World"})
})

UserRoute.post("/users", (c) => {
    return c.json({message: "Hello World"})
})

UserRoute.put("/users", (c) => {
    return c.json({message: "Hello World"})
})

UserRoute.delete("/users", (c) => {
    return c.json({message: "Hello World"})
})