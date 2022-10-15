import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../index";
export declare class FirstRun implements MiddlewareInterface<Context> {
    constructor();
    use({}: ResolverData<Context>, next: NextFn): Promise<any>;
}
export declare class UtilsResolver {
    initialize(): Promise<Boolean>;
}
