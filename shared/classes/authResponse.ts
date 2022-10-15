import { User } from "@generated/type-graphql";

export type AuthResponse = {
  token: string;
  user: Partial<User>;
};
