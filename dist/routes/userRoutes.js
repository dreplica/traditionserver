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
var express_1 = __importDefault(require("express"));
var authenticate_1 = __importDefault(require("../authenticate/authenticate"));
var users_1 = require("../controllers/users/users");
var app_1 = require("../app");
var router = express_1.default.Router();
// the site is where people sell just traditional clothes
router.get('/home', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(__dirname);
                res.sendFile(__dirname, 'userRoutes.ts');
                return [4 /*yield*/, users_1.home((_a = req) === null || _a === void 0 ? void 0 : _a.user)];
            case 1:
                person = _b.sent();
                console.log("coming");
                return [2 /*return*/, person.payload ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("enter");
                console.log(req.body);
                return [4 /*yield*/, users_1.register(req.body)];
            case 1:
                person = _a.sent();
                console.log(person);
                return [2 /*return*/, person.token ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
router.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("signing in");
                return [4 /*yield*/, users_1.signin(req.body)];
            case 1:
                person = _b.sent();
                return [2 /*return*/, ((_a = person) === null || _a === void 0 ? void 0 : _a.token) ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
router.post('/upload', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, app_1.upload(req, res, function (err) {
                console.log("whatdsap");
                if (err) {
                    console.log(err);
                    return res.status(500).send("error no pic");
                }
                return res.status(200).send("thank you");
            })];
    });
}); });
// router.get('/profile',authenticate, async (req:(user & Request), res:Response) => {
//     console.log("here its user",req?.user as string)
//     const person = await profile(req?.user as string)
//     return person.payload ?
//         res.status(200).json(person) :
//         res.status(404).json(person)
//  })
// router.get('cart', cart)
router.get('/history', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("history loading ....");
                return [4 /*yield*/, users_1.history((_a = req) === null || _a === void 0 ? void 0 : _a.user)];
            case 1:
                person = _b.sent();
                return [2 /*return*/, person.payload ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
router.post('/history', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, users_1.addhistory((_a = req) === null || _a === void 0 ? void 0 : _a.user, req.body)];
            case 1:
                person = _c.sent();
                return [2 /*return*/, ((_b = person) === null || _b === void 0 ? void 0 : _b.payload) ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
router.get('/items', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, users_1.items((_a = req) === null || _a === void 0 ? void 0 : _a.user)];
            case 1:
                person = _d.sent();
                return [2 /*return*/, ((_b = person) === null || _b === void 0 ? void 0 : _b.payload) ?
                        res.status(200).json((_c = person) === null || _c === void 0 ? void 0 : _c.payload) :
                        res.status(404).json(person)];
        }
    });
}); });
router.get('/items/:category/:type', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, users_1.itemstype((_a = req) === null || _a === void 0 ? void 0 : _a.user, req.params)];
            case 1:
                person = _d.sent();
                console.log(person);
                return [2 /*return*/, ((_b = person) === null || _b === void 0 ? void 0 : _b.payload) ?
                        res.status(200).json((_c = person) === null || _c === void 0 ? void 0 : _c.payload) :
                        res.status(404).json(person)];
        }
    });
}); });
router.post('/items', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log(req.body);
                return [4 /*yield*/, users_1.additems((_a = req) === null || _a === void 0 ? void 0 : _a.user, req.body)];
            case 1:
                person = _c.sent();
                return [2 /*return*/, ((_b = person) === null || _b === void 0 ? void 0 : _b.payload) ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
router.post('/search/:id', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("searching ....");
                return [4 /*yield*/, users_1.Search((_a = req) === null || _a === void 0 ? void 0 : _a.user, req.params['id'])];
            case 1:
                person = _c.sent();
                return [2 /*return*/, ((_b = person) === null || _b === void 0 ? void 0 : _b.search) ?
                        res.status(200).json(person) :
                        res.status(404).json(person)];
        }
    });
}); });
// router.get('items', items)+
exports.default = router;
