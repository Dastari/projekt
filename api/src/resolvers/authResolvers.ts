import { Arg, Ctx, Mutation, Query, UseMiddleware, MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../index";
import { GraphQLError } from "graphql";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export class AuthResolvers {
  @Mutation(() => String || GraphQLError)
  async login(
    @Ctx() { prisma }: Context,
    @Arg("email", () => String, { nullable: false }) email: string,
    @Arg("password", () => String, { nullable: false }) password: string
  ): Promise<String | GraphQLError> {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, name: true, password: true, roleName: true },
    });

    if (!user) {
      return new GraphQLError("Invalid email address or password");
    }

    return new Promise((resolve) => {
      compare(password, user.password, (error, response) => {
        if (error) {
          resolve(new GraphQLError(error.message));
        }
        if (response) {
          resolve(
            sign({ user: { id: user.id, name: user.name, roleName: user.roleName } }, JWT_SECRET, { expiresIn: "1h" })
          );
        } else {
          resolve(new GraphQLError("Invalid email address or password"));
        }
      });
    });
  }
}
