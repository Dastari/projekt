import { AuthChecker } from "type-graphql";
import { Context } from "../index";

export const customAuthChecker: AuthChecker<Context> = ({ root, args, context, info }, permissions) => {
  const { user } = context;

  console.log("Checking for Roles", permissions);

  return false;
};
