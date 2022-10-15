import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../index";
export declare class FirstRun implements MiddlewareInterface<Context> {
    constructor();
    use({}: ResolverData<Context>, next: NextFn): Promise<any>;
}
export declare class UtilsResolver {
    initialize({ prisma }: Context, projektName: string, email: string, name: string): Promise<false | String>;
}
