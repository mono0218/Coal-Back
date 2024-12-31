import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'

export function getPrismaClient(){
    require('dotenv').config()
    return new PrismaClient(
        {
            datasources: {
                db: {
                    url: process.env.DIRECT_DATABASE_URL,

                }
            }
        }
    ).$extends(withAccelerate())
}
