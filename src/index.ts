import {Hono} from "hono";
import {kindeRoute} from "./kinde";
import {UserRoute} from "./users";
import {RoomRoute} from "./rooms";
import {FriendRoute} from "./friends";
import {HTTPException} from "hono/http-exception";

const app = new Hono();

app.use((c,next) => {
    try{
        let token = c.req.header("Authorization")

        if (!token) throw new HTTPException(401,{message:"Unauthorized"});

        token = token.split(" ")[1];


    }catch (e) {
        console.log(e);
    }
})

app.get("/", (c,next) => {
    return c.json({status: "Success"});
});

app.route("/webhook",kindeRoute);
app.route("/users",UserRoute);
app.route("/rooms",RoomRoute);
app.route("/friends",FriendRoute);

export default app;