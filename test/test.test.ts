import { expect, test } from "bun:test";
import app from "../src/index"

test("index Route Test",async ()=>{
    const res = await app.request("/",{
        method: "GET"
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({status: "Success"})
})

