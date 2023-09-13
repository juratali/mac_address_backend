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
exports.__esModule = true;
exports.user = void 0;
var client_1 = require("@prisma/client");
var express_1 = require("express");
var user = (0, express_1.Router)();
exports.user = user;
var client = new client_1.PrismaClient();
user.post("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, permissions, findPermissions_1, missedData, createUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name = _a.name, permissions = _a.permissions;
                return [4 /*yield*/, client.permissions.findMany({
                        where: {
                            id: {
                                "in": permissions
                            }
                        }
                    })];
            case 1:
                findPermissions_1 = _b.sent();
                if (findPermissions_1.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            message: "There is no any permissions with your request!"
                        })];
                }
                missedData = permissions.filter(function (id) { return !findPermissions_1.map(function (elem) { return elem.id; }).includes(id); });
                if (missedData.length !== 0) {
                    return [2 /*return*/, res.json({
                            missedIDs: missedData
                        })];
                }
                return [4 /*yield*/, client.user.create({
                        data: {
                            name: name,
                            permissions: findPermissions_1
                        }
                    })];
            case 2:
                createUser = _b.sent();
                res.status(201).json({
                    message: "User is created!",
                    info: createUser
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
user["delete"]("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, permId_1, findUser, oldPerms, target, newPerms, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, userId = _a.userId, permId_1 = _a.permId;
                return [4 /*yield*/, client.user.findUnique({
                        where: {
                            id: +userId
                        }
                    })];
            case 1:
                findUser = _b.sent();
                if (!findUser)
                    return [2 /*return*/, res.status(404).json({ message: "User not found!" })];
                oldPerms = JSON.parse(findUser.permissions.toString());
                target = oldPerms.filter(function (elem) { return elem.id === +permId_1; });
                if (target.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Permission is not found to delete!"
                        })];
                }
                newPerms = oldPerms.filter(function (elem) { return elem.id !== +permId_1; });
                // deleting permission
                return [4 /*yield*/, client.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            permissions: newPerms
                        }
                    })];
            case 2:
                // deleting permission
                _b.sent();
                res.status(200).json({
                    message: "permission is successfully deleted from the user!"
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
user.get("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.user.findMany()];
            case 1:
                users = _a.sent();
                res.status(200).json({
                    message: "Here is all users of you!",
                    users: users
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=user.js.map