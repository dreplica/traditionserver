"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin/admin");
var router = express_1.default.Router();
router.get('home', admin_1.home);
router.get('profile', admin_1.profile);
router.get('history', admin_1.history);
router.get('items', admin_1.items);
router.post('upload', admin_1.uploadItem);
router.put('editItem', admin_1.editItem);
router.delete('removeItem', admin_1.removeItem);
exports.default = router;
