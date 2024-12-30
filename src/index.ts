import {Hono} from "hono";
import {kindeRoute} from "./kinde";
import {UserRoute} from "./users";
import {RoomRoute} from "./rooms";
import {FriendRoute} from "./friends";

const app = new Hono();

app.get("/", (c,next) => {
    return c.json({status: "Success"});
});

app.route("/webhook",kindeRoute);
app.route("/users",UserRoute);
app.route("/rooms",RoomRoute);
app.route("/friends",FriendRoute);

export default app;