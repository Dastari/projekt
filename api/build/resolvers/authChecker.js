"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = void 0;
var customAuthChecker = function (_a, permissions) {
    var root = _a.root, args = _a.args, context = _a.context, info = _a.info;
    var user = context.user;
    console.log("Checking for Roles", permissions);
    return false;
};
exports.customAuthChecker = customAuthChecker;
