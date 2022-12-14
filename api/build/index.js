"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.FIRSTRUN = void 0;
require("reflect-metadata");
var http_1 = require("http");
var type_graphql_1 = require("type-graphql");
var apollo_server_express_1 = require("apollo-server-express");
var ws_1 = require("ws");
var ws_2 = require("graphql-ws/lib/use/ws");
var client_1 = require("@prisma/client");
var type_graphql_2 = require("@generated/type-graphql");
var resolvers_1 = require("./resolvers");
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv").config();
var PORT = parseInt(process.env.PORT || "4040");
var JWT_SECRET = process.env.JWT_SECRET || "";
exports.FIRSTRUN = ".firstrun";
exports.prisma = new client_1.PrismaClient();
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, httpServer, schema, wsServer, apolloServer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1.default)();
                httpServer = (0, http_1.createServer)(app);
                (0, type_graphql_2.applyModelsEnhanceMap)(resolvers_1.modelsEnhanceMap);
                (0, type_graphql_2.applyResolversEnhanceMap)(resolvers_1.resolversEnhanceMap);
                return [4 /*yield*/, (0, type_graphql_1.buildSchema)({
                        resolvers: [type_graphql_2.FindManyUserResolver, resolvers_1.UtilsResolver, resolvers_1.AuthResolvers],
                        authChecker: resolvers_1.customAuthChecker,
                        validate: false,
                    })];
            case 1:
                schema = _a.sent();
                wsServer = new ws_1.WebSocketServer({
                    server: httpServer,
                    path: "/graphql",
                });
                (0, ws_2.useServer)({
                    schema: schema,
                    context: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, { prisma: exports.prisma, user: null }];
                        });
                    }); },
                    onOperation: function (_ctx, _message, _args, results) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, (0, fs_1.existsSync)(exports.FIRSTRUN)
                                    ? { errors: [new apollo_server_express_1.ApolloError("This Projekt has not been initiaised", "UNINITIALISED")] }
                                    : results];
                        });
                    }); },
                }, wsServer);
                apolloServer = new apollo_server_express_1.ApolloServer({
                    schema: schema,
                    persistedQueries: false,
                    context: function (_a) {
                        var req = _a.req;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var token, decoded;
                            var _b;
                            return __generator(this, function (_c) {
                                token = (_b = req.headers["x-auth-token"]) === null || _b === void 0 ? void 0 : _b.toString();
                                try {
                                    decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
                                    return [2 /*return*/, { prisma: exports.prisma, user: decoded.user }];
                                }
                                catch (e) {
                                    return [2 /*return*/, { prisma: exports.prisma }];
                                }
                                return [2 /*return*/];
                            });
                        });
                    },
                });
                return [4 /*yield*/, apolloServer.start()];
            case 2:
                _a.sent();
                apolloServer.applyMiddleware({ app: app });
                httpServer.listen({ port: PORT }, function () {
                    console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(PORT, "/graphql"));
                });
                return [2 /*return*/];
        }
    });
}); };
main()
    .catch(function (e) {
    throw e;
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
