"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = void 0;
var customAuthChecker = function (_a, roles) {
    var root = _a.root, args = _a.args, context = _a.context, info = _a.info;
    var user = context.user;
    if ((user === null || user === void 0 ? void 0 : user.roleName) === "Site Administrator") {
        return true;
    }
    console.log("Checking for Roles", roles);
    return false;
};
exports.customAuthChecker = customAuthChecker;
