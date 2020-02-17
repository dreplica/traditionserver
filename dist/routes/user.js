"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = require("../controllers/users/users");
var router = express_1.default.Router();
// router.get('home',home)
router.post('signup', users_1.register);
// router.post('signin',signin)
// router.get('profile',profile)
// router.get('cart', cart)
// router.get('history', history)
// router.get('items', items)
exports.default = router;
