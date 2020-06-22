"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var cors_1 = __importDefault(require("cors"));
var winston_1 = __importDefault(require("winston"));
var express_winston_1 = __importDefault(require("express-winston"));
var multer_1 = __importDefault(require("multer"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// the site is where people sell just traditional made things
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.upload = multer_1.default({ storage: storage }).single('file');
var app = express_1.default();
var logger = express_winston_1.default.logger({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
        return false;
    }
});
app.use(express_1.default.static('public'));
app.use(cors_1.default());
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(logger);
app.use("/", userRoutes_1.default);
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error');
});
exports.default = app;
