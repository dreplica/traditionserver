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
Object.defineProperty(exports, "__esModule", { value: true });
var pg_model_1 = require("../../models/pg-model");
// the site is where people sell just traditional clothes
exports.home = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var items;
    return __generator(this, function (_a) {
        if (!token) {
            console.log("no token");
            return [2 /*return*/, { error: "network error, please try again" }];
        }
        try {
            items = pg_model_1.db.query(pg_model_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Select * From items"], ["Select * From items"]))));
            return [2 /*return*/, { payload: items }];
        }
        catch (error) {
            console.log(error.message);
            return [2 /*return*/, { error: "netork error, please try again" }];
        }
        return [2 /*return*/];
    });
}); };
//add category haapens when the admin is about to add category
//front end talk
//for search, create a small component below the search icons, it would fetch data
//and rerender itself on every search input
//items table is the key here,
//e suppose get everything from 
exports.getSearchItem = function (token, args) { return __awaiter(void 0, void 0, void 0, function () {
    var item, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: "network error, please try again" }];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Select * from items where id=", ""], ["Select * from items where id=", ""])), args))];
            case 2:
                item = _a.sent();
                console.log(item);
                return [2 /*return*/, { search: item }];
            case 3:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [2 /*return*/, { error: error_1.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.Search = function (token, args) { return __awaiter(void 0, void 0, void 0, function () {
    var search, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: 'network error please try again' }];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log(args);
                return [4 /*yield*/, pg_model_1.db.query(pg_model_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["select * from items where lower(itemname) like ", ""], ["select * from items where lower(itemname) like ", ""])), '%' + args + '%'))];
            case 2:
                search = _a.sent();
                console.log(search);
                return [2 /*return*/, { search: search }];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, { error: error_2.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
var templateObject_1, templateObject_2, templateObject_3;
