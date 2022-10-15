import "reflect-metadata";
import { createServer } from "http";

import { buildSchema } from "type-graphql";
import { ApolloServer, ApolloError } from "apollo-server-express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { PrismaClient } from "@prisma/client";
import { applyModelsEnhanceMap, applyResolversEnhanceMap, FindManyUserResolver, User } from "@generated/type-graphql";
import { UtilsResolver, customAuthChecker, resolversEnhanceMap, modelsEnhanceMap, AuthResolvers } from "./resolvers";

import express from "express";
import { existsSync } from "fs";
import { JwtPayload, verify } from "jsonwebtoken";

require("dotenv").config();

const PORT = parseInt(process.env.PORT || "4040");
const JWT_SECRET = process.env.JWT_SECRET || "";
export const FIRSTRUN = ".firstrun";

export interface Context {
  prisma: PrismaClient;
  user?: Partial<User>;
}

export interface ProjektPayload extends JwtPayload {
  user: Partial<User>;
}

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  const httpServer = createServer(app);

  applyModelsEnhanceMap(modelsEnhanceMap);
  applyResolversEnhanceMap(resolversEnhanceMap);

  const schema = await buildSchema({
    resolvers: [FindManyUserResolver, UtilsResolver, AuthResolvers],
    authChecker: customAuthChecker,
    validate: false,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async () => {
        return { prisma, user: null };
      },

      onOperation: async (_ctx, _message, _args, results) => {
        return existsSync(FIRSTRUN)
          ? { errors: [new ApolloError("This Projekt has not been initiaised", "UNINITIALISED")] }
          : results;
      },
    },
    wsServer
  );

  const apolloServer = new ApolloServer({
    schema,
    persistedQueries: false,
    context: async ({ req }) => {
      const token: string | undefined = req.headers["x-auth-token"]?.toString();

      try {
        const decoded: ProjektPayload = verify(token as string, JWT_SECRET) as ProjektPayload;
        return { prisma, user: decoded.user };
      } catch (e) {
        return { prisma };
      }
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
