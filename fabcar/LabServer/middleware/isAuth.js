const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader;
  console.log(authHeader);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    res.status(403).send({
      message: error.message,
    });
    throw error;
  }
  req.userId = decodedToken.userId;
  console.log("req.userId" + req.userId);
  next();
};

exports.isAdmin = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader;
  console.log(authHeader);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  // console.log("decodedToken " + decodedToken.role);
  // next();

  if (decodedToken.role === "admin") {
    next();
  } else {
    res.status(403).send({
      message: "admin only",
    });
  }
};

exports.isOwner = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    res.status(403).send({
      message: error.message,
    });
    throw error
  }
  const token = authHeader;
  console.log(authHeader);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  // req.userId = decodedToken.userId;
  // console.log("req.userId" + req.userId);
  // next();
  console.log(req.params.patientID);
  console.log(decodedToken);

  if (decodedToken.id == req.params.patientID) {
    console.log("hererefzf");
    next();
  } else {
    res.status(403).send({
      message: "you are not allowed this action",
    });
  }
};

exports.decodedToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader;
  console.log(authHeader);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  // console.log("decodedToken " + decodedToken.role);
  // next();

  return decodedToken;
};
