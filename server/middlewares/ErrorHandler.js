module.exports = function errHandler(err, req, res, next) {
    let status = err.status || 500
    let message = err.message || 'Internal Server Error'

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = err.errors[0].message
            break;
        
        case "Email must be unique":
            status = 400;
            message = "Email must be unique"
            break;
        
        case "JsonWebTokenError":
        case "InvalidToken":
            status = 401
            message = "Invalid Token"
            break;
            
        default:
            console.log(err);
            res.status(status).json({message})
            break;
    }
}