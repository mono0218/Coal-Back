import { expect, test, describe } from "bun:test";
import app from "../src/index"

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYyOjk1Ojc0OjViOmE0OmJlOjBjOjkyOjFkOmQ1OjZjOjcwOjkzOjQ3OjM0OmQ4IiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InVzZXIiOnsiZW1haWwiOm51bGwsImZpcnN0X25hbWUiOiJhIiwiaWQiOiJrcF80MmY1YzlhMzU5MTU0ODJmYmViNGQzZWQyNjlkOWE1NSIsImlzX3Bhc3N3b3JkX3Jlc2V0X3JlcXVlc3RlZCI6ZmFsc2UsImlzX3N1c3BlbmRlZCI6ZmFsc2UsImxhc3RfbmFtZSI6ImEiLCJvcmdhbml6YXRpb25zIjpbeyJjb2RlIjoib3JnXzA0Yjg5ODM1YjM4ZiIsInBlcm1pc3Npb25zIjpudWxsLCJyb2xlcyI6bnVsbH1dLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGx9fSwiZXZlbnRfaWQiOiJldmVudF8wMTk0MTdiOGNkOTQyMjZkOGE3NmRkZjA5NWNhYzJmYiIsImV2ZW50X3RpbWVzdGFtcCI6IjIwMjQtMTItMzBUMjI6MTk6MzQuNzg5MjE4KzA5OjAwIiwic291cmNlIjoiYWRtaW4iLCJ0aW1lc3RhbXAiOiIyMDI0LTEyLTMwVDIyOjE5OjM0Ljg0OTA0NTQ0MSswOTowMCIsInR5cGUiOiJ1c2VyLmNyZWF0ZWQifQ.U88U9AT8YK0vDgMVOatmWj4MBfrUtEvAqJQPsq3qiBQfo3qK5gLfdYr7NK_PXn_g_JI-QXC6WvOdYL50suTtYND_QwqJ52JOsG7C3rlvza0-ub7QnHtxog42DzaY2fN7O7pfGEGLeSX-y_hxrI9InrqS1KkQdTrjB4dIYMNyU8Jcpe19s4gm-F-OkmHyg5YK9THy1gI_HcKn_B6Z2LLSuTVhCH2IiZJRrNWypVvnWpoj_CeSY1ZiQpXSRglL5Xn4-50M4BMSkypIpeQvZzoN8kJiY785BHAbvQBvLjlM51zkm0iW0NM3jfHIMXe6CZnA7wqKUi-HEbRtzIUwZtqxGw"

test("index Route Test",async ()=>{
    const res = await app.request("/",{
        method: "GET"
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({status: "Success"})
})

describe("Auth",()=>{
    test("Insert UserDB when SignUp",async ()=>{
        const res = await app.request("/webhook/kinde",{
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body:token
        })

        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({status: "Success"})
    })

    test("Insert UserDB when SignUpError",async ()=>{
        const res = await app.request("/webhook/kinde",{
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body:""
        })

        expect(res.status).toBe(400)
    })
})

