import {kindeRoute} from "./route/kinde";
import {UserRoute} from "./route/users";
import {RoomRoute} from "./route/rooms";
import {FriendRoute} from "./route/friends";
import {HTTPException} from "hono/http-exception";
import {jwtAuth} from "./lib/auth";
import { openAPISpecs } from 'hono-openapi';
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError,
    PrismaClientValidationError
} from "@prisma/client/runtime/library";
import {ZodError} from "zod";
import {OpenAPIHono} from "@hono/zod-openapi";
import { swaggerUI } from '@hono/swagger-ui';


const app = new OpenAPIHono<{ Variables: {"user_id":string}}>();

app.use("*",async (c, next) => {
    if (c.req.path.includes("/webhook") || c.req.path.includes("/openapi")|| c.req.path.includes("/docs")||c.req.path.includes("/specification")) return await next();

    let token = c.req.header("Authorization")
    if (!token) throw new HTTPException(401,{message:"Unauthorized"});

    token = token.split(" ")[1];
    let user_id = await jwtAuth(token);

    c.set("user_id",user_id);
    await next();
})

app.get(
    '/openapi',
    openAPISpecs(app, {
        documentation: {
            info: { title: 'Hono API', version: '1.0.0', description: 'Greeting API' },
            servers: [{ url: 'http://localhost:3000', description: 'Local Server' }],
        },
    })
);

app.doc('/specification', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'My API',
    },
})

app.get('/docs', swaggerUI({
    url: '/specification',
}));

app.get("/", (c) => {
    return c.json({status: "Success"});
});

app.route("/webhook",kindeRoute);
app.route("/users",UserRoute);
app.route("/rooms",RoomRoute);
app.route("/friends",FriendRoute);

app.onError((e,c) => {
    console.log(e)
    if (e instanceof HTTPException) return c.json({message: e.message},e.status);
    if (e instanceof PrismaClientValidationError) return c.json({message: e.message},400);
    if (e instanceof PrismaClientInitializationError) return c.json({message: e.message},500);
    if (e instanceof PrismaClientKnownRequestError) return c.json({message: e.message},500);
    if (e instanceof PrismaClientRustPanicError) return c.json({message: e.message},500);
    if (e instanceof PrismaClientUnknownRequestError) return c.json({message: e.message},500);
    if (e instanceof ZodError) return c.json({message: e.message},400);

    return c.json({message: "Internal Server Error"}, 500);
})

export default app;