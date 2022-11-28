"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UtilsResolver = exports.FirstRun = void 0;
var type_graphql_1 = require("type-graphql");
var fs_1 = require("fs");
var generate_passphrase_1 = require("generate-passphrase");
var bcrypt_1 = require("bcrypt");
var index_1 = require("../index");
var graphql_type_json_1 = __importDefault(require("graphql-type-json"));
var SALT = 10;
var FirstRun = /** @class */ (function () {
    function FirstRun() {
    }
    FirstRun.prototype.use = function (_a, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, (0, fs_1.existsSync)(index_1.FIRSTRUN) ? next() : false];
            });
        });
    };
    return FirstRun;
}());
exports.FirstRun = FirstRun;
var UtilsResolver = /** @class */ (function () {
    function UtilsResolver() {
    }
    UtilsResolver.prototype.initialize = function (_a, projektName, email, name) {
        var prisma = _a.prisma;
        return __awaiter(this, void 0, void 0, function () {
            var passphrase, role, user, _b, _c;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        passphrase = (0, generate_passphrase_1.generate)({ titlecase: true, numbers: false });
                        return [4 /*yield*/, prisma.setting.deleteMany({})];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, prisma.setting.create({
                                data: {
                                    name: "projektName",
                                    value: projektName,
                                },
                            })];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, prisma.role.deleteMany({})];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, prisma.role.create({
                                data: {
                                    name: "Site Administrator",
                                },
                            })];
                    case 4:
                        role = _f.sent();
                        return [4 /*yield*/, prisma.user.deleteMany({})];
                    case 5:
                        _f.sent();
                        _c = (_b = prisma.user).create;
                        _d = {};
                        _e = {
                            email: email,
                            name: name
                        };
                        return [4 /*yield*/, (0, bcrypt_1.hash)(passphrase, SALT)];
                    case 6: return [4 /*yield*/, _c.apply(_b, [(_d.data = (_e.password = _f.sent(),
                                _e.roleName = role.name,
                                _e),
                                _d)])];
                    case 7:
                        user = _f.sent();
                        if (!user) return [3 /*break*/, 9];
                        return [4 /*yield*/, (0, fs_1.unlinkSync)(index_1.FIRSTRUN)];
                    case 8:
                        _f.sent();
                        return [2 /*return*/, passphrase];
                    case 9: return [2 /*return*/, false];
                }
            });
        });
    };
    UtilsResolver.prototype.settings = function (_a) {
        var prisma = _a.prisma;
        return __awaiter(this, void 0, void 0, function () {
            var settings, settingsObject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prisma.setting.findMany({})];
                    case 1:
                        settings = _b.sent();
                        settingsObject = settings.reduce(function (map, cur) {
                            try {
                                var parsed = JSON.parse(cur.value);
                                map[cur.name] = parsed;
                            }
                            catch (_a) {
                                map[cur.name] = cur.value;
                            }
                            return map;
                        }, {});
                        return [2 /*return*/, settingsObject];
                }
            });
        });
    };
    __decorate([
        (0, type_graphql_1.UseMiddleware)(FirstRun),
        (0, type_graphql_1.Mutation)(function () { return false || String; }),
        __param(0, (0, type_graphql_1.Ctx)()),
        __param(1, (0, type_graphql_1.Arg)("projektName", function () { return String; }, { nullable: false })),
        __param(2, (0, type_graphql_1.Arg)("email", function () { return String; }, { nullable: false })),
        __param(3, (0, type_graphql_1.Arg)("name", function () { return String; }, { nullable: false }))
    ], UtilsResolver.prototype, "initialize", null);
    __decorate([
        (0, type_graphql_1.Query)(function () { return graphql_type_json_1.default; }),
        __param(0, (0, type_graphql_1.Ctx)())
    ], UtilsResolver.prototype, "settings", null);
    return UtilsResolver;
}());
exports.UtilsResolver = UtilsResolver;
