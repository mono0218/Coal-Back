import {Hono} from "hono";
import {kindeRoute} from "./kinde";

const app = new Hono();

app.route("/webhook",kindeRoute);

app.get("/", (c,next) => {
    return c.json({status: "Success"});
});



export default app;