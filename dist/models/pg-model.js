"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importStar(require("@databases/pg"));
exports.sql = pg_1.sql;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var db = pg_1.default();
exports.db = db;
var authenticate_db = function () {
    console.log("starting database");
    db.query(pg_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Select 1=1;"], ["Select 1=1;"]))));
    console.log("database connected");
};
exports.authenticate_db = authenticate_db;
var templateObject_1;
