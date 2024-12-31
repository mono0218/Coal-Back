import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import {env} from "hono/adapter";


export function getPrismaClient(){
    return new PrismaClient({
        datasources: {
            db: {
                url: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZTZjMjExNmMtNzQxYS00MTIzLWE5NzctNzY4MmZmMjUzYjg3IiwidGVuYW50X2lkIjoiZmJlMGY5MjI0YjQyMzlkNDdkYjc4NmE2NGVjNDY1ZGVlNjEzMmExOGQ2NDY5MmFiNTI0N2NiOGU5MGY2ZDBkNyIsImludGVybmFsX3NlY3JldCI6ImU0OWE1Y2Q1LWM1ZDctNDU2OC1iYzk1LTU3MjMxYmM4MzBhMiJ9.0wJgkwcLb_NZ8Dz8JeY0ssaaTqzNEoU0SIH3xSL2UIM"
            }
        }
    }).$extends(withAccelerate())
}
