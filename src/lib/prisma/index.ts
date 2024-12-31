import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'

export function getPrismaClient(url: string) {
    return new PrismaClient(
        {
            datasourceUrl: url
        }
    ).$extends(withAccelerate())
}
