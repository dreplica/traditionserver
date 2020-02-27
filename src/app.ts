import express,{Response,Request,NextFunction} from 'express';
import createError, { HttpError } from 'http-errors';
import cors from 'cors'
import userControl from './routes/userRoutes'
import adminControl from './routes/adminRoutes'
import winston from 'winston';
import path from 'path'

import expressWinston from 'express-winston';
import multer from 'multer'

// the site is where people sell just traditional made things
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
})
export const upload = multer({ storage: storage }).single('file')

const app = express();
const logger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
        return false;
    }
});

app.use(express.static('public'))
app.use(cors()) 
app.disable('x-powered-by'); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger)
app.use(()=>console.log(__dirname+""))
app.use("/", userControl)

app.use(function(_req, _res, next) {
	next(createError(404));
});
// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

export default app;