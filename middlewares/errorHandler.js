const errorHandler = (err, req, res, next) => {
    let statusCode;
    let message;

    switch(err.message) {
        case "missing_token":
            statusCode = 401
            message = "missing access token";
            break;
        default:
            code=500
            message = "internal server error"
            break
    }

    return res.status(statusCode).json({
        success: false,
        message
    })
}

export default errorHandler