import { Arg, Ctx, Query, Mutation, UseMiddleware, MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../index";
import { existsSync, unlinkSync } from "fs";
import { generate } from "generate-passphrase";
import { hash } from "bcrypt";
import { FIRSTRUN } from "../index";
import GraphQLJSON from "graphql-type-json";

const SALT = 10;

interface Settings {
  projectName?: string;
  projectLogo?: string;
  theme?: any;
}

export class FirstRun implements MiddlewareInterface<Context> {
  constructor() {}
  async use({}: ResolverData<Context>, next: NextFn) {
    return existsSync(FIRSTRUN) ? next() : false;
  }
}

export class UtilsResolver {
  @UseMiddleware(FirstRun)
  @Mutation(() => false || String)
  async initialize(
    @Ctx() { prisma }: Context,
    @Arg("projektName", () => String, { nullable: false }) projektName: string,
    @Arg("email", () => String, { nullable: false }) email: string,
    @Arg("name", () => String, { nullable: false }) name: string,
    @Arg("logo", () => String, { nullable: false }) logo: string,
    @Arg("darkTheme", () => GraphQLJSON, { nullable: false }) darkTheme: JSON,
    @Arg("lightTheme", () => GraphQLJSON, { nullable: false }) lightTheme: JSON
  ): Promise<false | String> {
    const passphrase = generate({ titlecase: true, numbers: false });

    await prisma.setting.deleteMany({});
    await prisma.setting.create({
      data: {
        name: "projektName",
        value: projektName,
      },
    });

    await prisma.setting.create({
      data: {
        name: "logo",
        value: logo,
      },
    });

    await prisma.setting.create({
      data: {
        name: "darkTheme",
        value: JSON.stringify(darkTheme),
      },
    });

    await prisma.setting.create({
      data: {
        name: "lightTheme",
        value: JSON.stringify(lightTheme),
      },
    });

    await prisma.permission.deleteMany({});
    const permission = await prisma.permission.create({
      data: {
        name: "Global Administrator",
      },
    });

    await prisma.user.deleteMany({});
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: await hash(passphrase, SALT),
        permissions: { connect: { name: "Global Administrator" } },
      },
    });

    if (user) {
      await unlinkSync(FIRSTRUN);
      return passphrase;
    } else {
      return false;
    }
  }

  @Query(() => GraphQLJSON)
  async settings(@Ctx() { prisma }: Context): Promise<Settings> {
    const settings = await prisma.setting.findMany({});
    const settingsObject = settings.reduce<Record<string, string>>((map, cur) => {
      try {
        const parsed = JSON.parse(cur.value);
        map[cur.name] = parsed;
      } catch {
        map[cur.name] = cur.value;
      }
      return map;
    }, {});

    return settingsObject;
  }
}
