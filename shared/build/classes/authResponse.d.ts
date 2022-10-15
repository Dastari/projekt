import { User } from "@generated/type-graphql";
export declare type AuthResponse = {
    token: string;
    user: Partial<User>;
};
