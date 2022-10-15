"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelsEnhanceMap = exports.resolversEnhanceMap = void 0;
var type_graphql_1 = require("type-graphql");
var userActionsConfig = {
    _all: [(0, type_graphql_1.Authorized)(["Site Administrator", "Administrator"])],
};
var userEnhanceConfig = {};
exports.resolversEnhanceMap = {
    User: userActionsConfig,
};
exports.modelsEnhanceMap = {
    User: userEnhanceConfig,
};
