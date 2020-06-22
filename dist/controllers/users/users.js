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
exports.home = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var items_1;
    return __generator(this, function (_a) {
        if (!token) {
            console.log("no token");
            return [2 /*return*/, { error: "network error, please try again" }];
        }
        try {
            items_1 = pg_model_1.db.query(pg_model_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Select * From items"], ["Select * From items"]))));
            return [2 /*return*/, { payload: items_1 }];
        }
        catch (error) {
            console.log(error.message);
            return [2 /*return*/, { error: "netork error, please try again" }];
        }
        return [2 /*return*/];
    });
}); };
exports.signin = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, compare, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = args;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Select password,isadmin from users where email=", ""], ["Select password,isadmin from users where email=", ""])), body.email))];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.compare(body.password, user[0].password)];
            case 3:
                compare = _a.sent();
                if (!compare || user.length === 0) {
                    return [2 /*return*/, { error: "did you mispell password or email?" }];
                }
                token = jsonwebtoken_1.default.sign({ token: body.email }, process.env.JWTTOKEN);
                return [2 /*return*/, { token: token, admin: user[0].isadmin }];
            case 4:
                error_1 = _a.sent();
                console.log("error");
                //after am done, if any error occurs, send mismatch in usname or pass
                return [2 /*return*/, { error: "did you forget your email?" }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var body, Created, Updated, checkUser, salt, hash, token, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = args;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                Created = new Date().toISOString();
                Updated = new Date().toISOString();
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Select email from users where email = ", ""], ["Select email from users where email = ", ""])), body.email))];
            case 2:
                checkUser = _b.sent();
                console.log(checkUser);
                if (checkUser.length > 0) {
                    return [2 /*return*/, { error: "sorry this account already exist!" }];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(body.password, salt)];
            case 4:
                hash = _b.sent();
                pg_model_1.db.query(pg_model_1.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Insert into Users values (uuid_generate_v4(),\n        ", ", ", ", ", ",\n        ", ",", ", ", ", ", ", \n        ", ",", ")"], ["Insert into Users values (uuid_generate_v4(),\n        ", ", ", ", ", ",\n        ", ",", ", ", ", ", ", \n        ", ",", ")"])), body.username, body.firstname, body.lastname, body.email, hash, body.phone, (_a = body.admin) !== null && _a !== void 0 ? _a : true, Created, Updated));
                token = jsonwebtoken_1.default.sign({ token: body.email }, process.env.JWTTOKEN);
                return [2 /*return*/, { token: token, admin: body.admin }
                    //after registering, send a mail to user, requesting approval
                ];
            case 5:
                error_2 = _b.sent();
                return [2 /*return*/, { error: error_2.message }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.profile = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("entered");
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Select * from users where email = ", ""], ["Select * from users where email = ", ""])), token))];
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
exports.history = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var hist, error_4;
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
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Select items.item, items.price, \n                                        history.date_bought, items.supplier\n                                        From items Inner Join history on\n                                        items.id = history.items_id\n                                        Where history.user_id=", ""], ["Select items.item, items.price, \n                                        history.date_bought, items.supplier\n                                        From items Inner Join history on\n                                        items.id = history.items_id\n                                        Where history.user_id=", ""])), token))];
            case 2:
                hist = _a.sent();
                return [2 /*return*/, { payload: hist }];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, { error: error_4.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
//add history happens when the user makes a purchase
exports.addhistory = function (token, args) { return __awaiter(void 0, void 0, void 0, function () {
    var now, add, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                ;
                now = new Date().toISOString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["insert into history Values (uuid_generate_v4(),\n                    ", ",", ",", ",", ",\n                    ", ",", ",) Returning *"], ["insert into history Values (uuid_generate_v4(),\n                    ", ",", ",", ",", ",\n                    ", ",", ",) Returning *"])), args.itemid, args.userid, args.bougth, args.quantity, args.delivered, now))];
            case 2:
                add = _a.sent();
                return [2 /*return*/, { payload: add }];
            case 3:
                error_5 = _a.sent();
                console.log(error_5.messsage);
                return [2 /*return*/, { error: error_5.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.category = function (token, cat) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, error_6;
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
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n        Select category from items\n        "], ["\n        Select category from items\n        "]))))];
            case 2:
                categories = _a.sent();
                return [2 /*return*/, { payload: categories }];
            case 3:
                error_6 = _a.sent();
                return [2 /*return*/, { error: error_6.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
//add category haapens when the admin is about to add category
exports.addcategory = function (token, args) { return __awaiter(void 0, void 0, void 0, function () {
    var now, update, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("hello");
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                ;
                now = new Date().toISOString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('entering');
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Insert into category values(uuid_generate_v4(),\n                        ", ",", ",\n                        ", ",", ") Returning *"], ["Insert into category values(uuid_generate_v4(),\n                        ", ",", ",\n                        ", ",", ") Returning *"])), args.categoryname, args.categoryimage, now, now))];
            case 2:
                update = _a.sent();
                return [2 /*return*/, { payload: update }];
            case 3:
                error_7 = _a.sent();
                console.log(error_7.message);
                return [2 /*return*/, { error: error_7.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
//front end talk
//for search, create a small component below the search icons, it would fetch data
//and rerender itself on every search input
//items table is the key here,
//e suppose get everything from 
exports.items = function (token, id) { return __awaiter(void 0, void 0, void 0, function () {
    var item, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["Select * from items where id=", ""], ["Select * from items where id=", ""])), id))];
            case 2:
                item = _a.sent();
                console.log(item);
                return [2 /*return*/, { payload: item }];
            case 3:
                error_8 = _a.sent();
                console.log(error_8.message);
                return [2 /*return*/, { error: error_8.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
//happens when the dmin adds an item
exports.additems = function (token, args) { return __awaiter(void 0, void 0, void 0, function () {
    var now, userId, item, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                now = new Date().toISOString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log("started adding");
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Select id from users where email=", ""], ["Select id from users where email=", ""])), token))];
            case 2:
                userId = _a.sent();
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["Insert Into items Values (uuid_generate_v4(),\n            ", ",", ",", ",", ",", ",\n            ", ",", ",", ",\n            ", ",", ") returning *"], ["Insert Into items Values (uuid_generate_v4(),\n            ", ",", ",", ",", ",", ",\n            ", ",", ",", ",\n            ", ",", ") returning *"])), args.name, args.type, args.category, args.price, args.description, args.quantity, userId[0].id, args.image, now, now))];
            case 3:
                item = _a.sent();
                return [2 /*return*/, { payload: item }];
            case 4:
                error_9 = _a.sent();
                console.log(error_9.message);
                return [2 /*return*/, { error: error_9.message }];
            case 5: return [2 /*return*/];
        }
    });
}); };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
