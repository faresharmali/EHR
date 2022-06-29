const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const NodeCouchdb = require("node-couchdb");

const couch = require("../models/db");

let loadedUser;
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
  
    const user = await couch
      .get("users", email.toString().trim())
      .then((data) => {
        return data.data;
      }).catch((error)=>{
        res.json({
          ok:false,
          error: "user with this email not found!",
        });
      })

    console.log("***********************");
    console.log(user);

    if (!user) {
      res.json({
        ok:false,
        error: "user with this email not found!",
      });
    }

    loadedUser = user;

    const match = await bcrypt.compare(password, user.password);

    console.log("***********************");

    if (!match) {
    
      res.json({
        ok:false,
        error: "check your email and password",
      });
    }

    if (match) {
    

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

      return res.json({
        ok:true,
        token: token,
        user:loadedUser
      });
    } else {
      // response is OutgoingMessage object that server response http request
      return res.json({
        ok: false,
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
