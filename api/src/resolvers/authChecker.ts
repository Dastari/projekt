import { AuthChecker } from "type-graphql";
import { Context } from "../index";

export const customAuthChecker: AuthChecker<Context> = ({ root, args, context, info }, roles) => {
  const { user } = context;

  if (user?.roleName === "Site Administrator") {
    return true;
  }

  console.log("Checking for Roles", roles);

  return false;
};
