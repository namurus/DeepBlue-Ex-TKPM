import { StatusCodes } from 'http-status-codes'
// import { env } from '~/config/environment'

// Middleware handle global error
export const errorHandlingMiddleware = (err, req, res, next) => {

    // Default status code is 500 (Internal Server Error)
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    // create a response error object to send back to the client
    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode], // If error does not have a message, use ReasonPhrases according to Status Code
        stack: err.stack
    }
    // console.error(responseError)

    // Only in DEV environment, return Stack Trace for easier debugging, otherwise remove it. (To understand more, please watch video 55 in the MERN Stack series on my YouTube channel: https://www.youtube.com/@trungquandev)
    // if (env.BUILD_MODE !== 'dev') delete responseError.stack

    // This section can be expanded in the future, such as writing Error Log to a file, sending error notifications to Slack, Telegram, Email... etc. Or it can be written separately in a different Middleware file depending on the project.
    // ...
    // console.error(responseError)

    // Return responseError to the Front-end
    res.status(responseError.statusCode).json(responseError)
}