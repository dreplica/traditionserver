"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
        while (_) try {
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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var pg_model_1 = require("../../models/pg-model");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
// export const home = async (id: string) => {
// 	const _id = id;
// };
exports.signin = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, compare, _a, _b, token, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = args;
                // const {error} = register.validate(body)
                console.log("entered");
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Select password from users where email=", ""], ["Select password from users where email=", ""])), body.email))];
            case 2:
                user = _c.sent();
                console.log("jaming", user);
                return [4 /*yield*/, bcryptjs_1.default.compare(body.password, user[0].password)];
            case 3:
                compare = _c.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, compare];
            case 4:
                _b.apply(_a, [_c.sent()]);
                if (!compare || user.length === 0) {
                    return [2 /*return*/, "mismatch in password and email"];
                }
                token = jsonwebtoken_1.default.sign({ token: body.email }, process.env.JWTTOKEN);
                return [2 /*return*/, { token: token }];
            case 5:
                error_1 = _c.sent();
                console.log("error");
                //after am done, if any error occurs, send mismatch in usname or pass
                return [2 /*return*/, error_1.message];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var body, admin, Created, Updated, checkUser, salt, hash, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("enter");
                body = args;
                console.log(body);
                admin = "false";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                Created = new Date().toISOString();
                Updated = new Date().toISOString();
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Select email from users where email = ", ""], ["Select email from users where email = ", ""])), body.email))];
            case 2:
                checkUser = _a.sent();
                if (checkUser.length > 0) {
                    return [2 /*return*/, "sorry this account already exist"];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(body.password, salt)];
            case 4:
                hash = _a.sent();
                pg_model_1.db.query(pg_model_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Insert into Users values (uuid_generate_v4(),\n        ", ", ", ", ", ",\n        ", ",", ", ", ", ", ", \n        ", ",", ")"], ["Insert into Users values (uuid_generate_v4(),\n        ", ", ", ", ", ",\n        ", ",", ", ", ", ", ", \n        ", ",", ")"])), body.username, body.firstname, body.lastname, body.email, hash, body.phone, admin, Created, Updated));
                token = jsonwebtoken_1.default.sign({ token: body.email }, process.env.JWTTOKEN);
                return [2 /*return*/, { token: token }
                    //after registering, send a mail to user, requesting approval
                ];
            case 5:
                error_2 = _a.sent();
                return [2 /*return*/, error_2.message];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.profile = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Select * from users where email = ", " Returning *"], ["Select * from users where email = ", " Returning *"])), token))];
            case 2:
                user = _a.sent();
                return [2 /*return*/, { payload: user }];
            case 3:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [2 /*return*/, { error: "network error, please try again" }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.cart = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.history = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.items = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
