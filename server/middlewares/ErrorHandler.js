const errHandler = (err, req, res, next) => {
    switch (err.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "Email/Password Required":
        res.status(400).json({ message: "Email/Password Required" });
        break;      
      case "InvalidLogin":
        res.status(401).json({ message: "Invalid Email/Password" });
        break;
      case "LoginValidation":
        res.status(401).json({ message: "Silahkan login dahulu" });
        break;
      case "NoUserFound":
        res.status(404).json({ message: "Silahkan daftar dahulu" });
        break;
      case "Invalid Token":
      case "JsonWebTokenError":
        res.status(401).json({ message: "Token Failed" });
        break;
      default:
        console.log(err, "ini errornya");
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  };
  
  module.exports = { errHandler };
