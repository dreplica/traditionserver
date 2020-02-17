import express,{Response,Request,NextFunction} from 'express';
import createError, { HttpError } from 'http-errors';
import cors from 'cors'
import userControl from './routes/userRoutes'
import adminControl from './routes/adminRoutes'
import winston from 'winston';
import expressWinston from 'express-winston';
import authenticate from './authenticate/authenticate';

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

app.use(cors())
app.disable('x-powered-by'); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger)

app.use("/",authenticate, userControl)
// app.use("/admin",adminControl)


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