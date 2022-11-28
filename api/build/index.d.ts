import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { User } from "@generated/type-graphql";
import { JwtPayload } from "jsonwebtoken";
export declare const FIRSTRUN = ".firstrun";
export interface Context {
    prisma: PrismaClient;
    user?: Partial<User>;
}
export interface ProjektPayload extends JwtPayload {
    user: Partial<User>;
}
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation | undefined>;
