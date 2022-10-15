import { Context } from "../index";
import { GraphQLError } from "graphql";
export declare class AuthResolvers {
    login({ prisma }: Context, email: string, password: string): Promise<String | GraphQLError>;
}
