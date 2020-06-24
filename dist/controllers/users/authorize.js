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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var pg_model_1 = require("../../models/pg-model");
exports.signin = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var user, compare, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT password,isadmin FROM users WHERE email=", ""], ["SELECT password,isadmin FROM users WHERE email=", ""])), body.email))];
            case 1:
                user = (_a.sent())[0];
                return [4 /*yield*/, bcryptjs_1.default.compare(body.password, user.password)];
            case 2:
                compare = _a.sent();
                if (!compare || user.length === 0) {
                    return [2 /*return*/, { error: "did you mispell password or email?" }];
                }
                token = jsonwebtoken_1.default.sign({ token: body.email }, process.env.JWTTOKEN);
                return [2 /*return*/, { token: token, isadmin: user.isadmin }];
            case 3:
                error_1 = _a.sent();
                console.log("error");
                //after am done, if any error occurs, send mismatch in usname or pass
                return [2 /*return*/, { error: "did you mispell password or email?" }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var Created, Updated, checkUser, salt, hash, user, token, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                Created = new Date().toISOString();
                Updated = new Date().toISOString();
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Select email from users where email = ", ""], ["Select email from users where email = ", ""])), body.email))];
            case 1:
                checkUser = _b.sent();
                if (checkUser.length > 0) {
                    return [2 /*return*/, { error: "sorry this account already exist!" }];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(body.password, salt)];
            case 3:
                hash = _b.sent();
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Insert into Users values (uuid_generate_v4(),\n        ", ", ", ", ", ",\n        ", ",", ", ", ", ", ") returning id"], ["Insert into Users values (uuid_generate_v4(),\n        ", ", ", ", ", ",\n        ", ",", ", ", ", ", ") returning id"])), body.username, body.firstname, body.lastname, body.email, hash, body.phone, (_a = body.isadmin) !== null && _a !== void 0 ? _a : true))];
            case 4:
                user = (_b.sent())[0];
                if (!body.isadmin) return [3 /*break*/, 6];
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["INSERT INTO seller VALUES (uuid_generate_v4(),\n            ", ", ", ",", ",\n            ", ",", ",", ",", ")"], ["INSERT INTO seller VALUES (uuid_generate_v4(),\n            ", ", ", ",", ",\n            ", ",", ",", ",", ")"])), user.id, body.companyname, body.companydesc, body.logo, body.facebook, body.twitter, body.instagram))];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                token = jsonwebtoken_1.default.sign({ token: body.email }, process.env.JWTTOKEN);
                return [2 /*return*/, { token: token, isadmin: body.isadmin }
                    //after registering, send a mail to user, requesting approval
                ];
            case 7:
                error_2 = _b.sent();
                return [2 /*return*/, { error: error_2.message }];
            case 8: return [2 /*return*/];
        }
    });
}); };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
