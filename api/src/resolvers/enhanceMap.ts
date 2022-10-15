import { ModelConfig, ModelsEnhanceMap, ResolverActionsConfig, ResolversEnhanceMap } from "@generated/type-graphql";
import { Authorized } from "type-graphql";

const userActionsConfig: ResolverActionsConfig<"User"> = {
  _all: [Authorized(["Administrator"])],
};
const userEnhanceConfig: ModelConfig<"User"> = {};

export const resolversEnhanceMap: ResolversEnhanceMap = {
  User: userActionsConfig,
};

export const modelsEnhanceMap: ModelsEnhanceMap = {
  User: userEnhanceConfig,
};
