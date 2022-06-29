const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const NodeCouchdb = require("node-couchdb");

const couch = require("../models/db");

// exports.postSignin = async (req, res, next) => {

//   const {
//     fullname,
//     email,
//     password,
//     isAdmin
//   } = req.body;
//   try {
//     const exsitUser = await userModel.findOne({
//       email: email
//     });
//     if (exsitUser) {
//       const error = new Error(
//         "Eamil already exist, please pick another email!"
//       );
//       return res.status(409).json({
//         error: "Eamil already exist, please pick another email! ",
//       });
//       error.statusCode = 409;
//       throw error;
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new userModel({
//       fullname: fullname,
//       email: email,
//       password: hashedPassword,
//       isAdmin: isAdmin

//     });
//     const result = await user.save();
//     res.status(200).json({
//       message: "User created",
//       user: {
//         id: result._id,
//         email: result.email
//       },
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

let loadedUser;
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // const user = await userModel.findOne({
    //   email: email
    // });



    const user = await couch
      .get("users", email.toString().trim())
      .then((data) => {
        return data.data;
      }).catch((error) => {
        const err = new Error(error);
        err.statusCode = 401;

        res.status(err.statusCode).send({
          message: "user with this email not found!"
        });
        throw err.message;
        return;
      });



    console.log("***********************");
    console.log(user);

    if (!user) {
      const error = new Error("user with this email not found!");
      error.statusCode = 401;
      throw error.message;
    }

    loadedUser = user;

    const match = await bcrypt.compare(password, user.password);

    console.log("***********************");

    if (!match) {
      // new error;
      // error.statusCode = 401;
      //throw error;
      res.json({
        error: "check your email and password",
      });
    }

    if (match) {
      // Send JWT

      const token = jwt.sign(
        {
          email: loadedUser._id,
          role: loadedUser.role,
          id: loadedUser.userID,
        },
        process.env.SECRETORPRIVATEKEY || "SECRETORPRIVATEKEY",
        {
          expiresIn: "20000m",
        }
      );

      return res.status(200).json({
        token: token,
      });
    } else {
      // response is OutgoingMessage object that server response http request
      return res.json({
        success: false,
        message: "ERROR auth check email and password",
      });
    }

    // if (!comparePassword) {
    //   const error = new Error("password is not match!");
    //   error.statusCode = 401;
    //   throw error;
    // }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getUser = (req, res, next) => {
  console.log("***********************");
  console.log(loadedUser);
  res.status(200).json({
    user: {
      // id: loadedUser._id,
      // fullname: loadedUser.lastName,
      id: loadedUser.userID,
      email: loadedUser._id,
      role: loadedUser.role,
    },
  });
};
