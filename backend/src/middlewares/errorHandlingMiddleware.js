import { StatusCodes, getReasonPhrase } from 'http-status-codes'
// import { env } from '~/config/environment'
import logger from '../config/logger' 

export const errorHandlingMiddleware = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    const responseError = {
        statusCode: err.statusCode,
        message: err.message || getReasonPhrase(err.statusCode),
        stack: err.stack
    }

    
    logger.error(`${req.method} ${req.originalUrl} - ${responseError.message}`)
    logger.error(responseError.stack)

    // Uncomment the following line to log the error stack trace only in development mode
    // if (env.BUILD_MODE !== 'dev') delete responseError.stack

    res.status(responseError.statusCode).json(responseError)
}
