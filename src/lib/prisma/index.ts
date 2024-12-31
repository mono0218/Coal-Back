import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'

export function getPrismaClient(){
    require('dotenv').config()
    return new PrismaClient(
        {
            datasourceUrl: process.env.DATABASE_URL,
        }
    ).$extends(withAccelerate())
}
