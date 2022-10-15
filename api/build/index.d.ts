import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { User } from "@generated/type-graphql";
export declare const FIRSTRUN = ".firstrun";
export interface Context {
    prisma: PrismaClient;
    user: User;
}
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation | undefined>;
