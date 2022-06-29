const bcrypt = require("bcryptjs");

// const FabricCAServices = require('fabric-ca-client');
// const NodeCouchdb = require('node-couchdb');
// const { Gateway, Wallets } = require('fabric-network');
// const fs = require('fs');
// const path = require('path');
const createAssetHelper = require("./helpers/assets/createAsset");

const couch = require("../models/db");
const { exit } = require("process");
const { v4: uuidv4 } = require("uuid");
const genWallet = require("./helpers/user/genWallet");
const authMid = require("../middleware/isAuth");
exports.deleteUser = async (req, res, next) => {


  couch
    .del(
      "users",
      req.body.email.toString().trim(),
      req.body._rev.toString().trim()
    )
    .then(
      ({ data, headers, status }) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
        res
          .json({
            data,
          })
          .status(200);
        return;
      },
      (err) => {
        res
          .json({
            err,
          })
          .status(300);
        return;
        // either request error occured
        // ...or err.code=EDOCMISSING if document does not exist
        // ...or err.code=EUNKNOWN if response status code is unexpected
      }
    );
};

exports.createUser = async (req, res, next) => {
  const body = [
    "email",
    "password",
    "role",
    "username",
    "firstName",
    "lastName",
    "birthday",
    "contact",
    "address",
    "org",
  ];
  body.forEach((element) => {
    if (!req.body.hasOwnProperty(element)) {
      res.status(400).send({
        message: `${element} is require`,
      });
      // return next(`${element} is require`);

      throw new Error(`${element} is require`).message;
    }
  });

  const ID = uuidv4();
  const hashedPassword = await bcrypt.hash(
    req.body.password.toString().trim(),
    12
  );

  //await genWallet.genWallet(req.body.org, ID.toString().trim());

  console.log("********************gen wallet***************************");
  await genWallet
    .genWallet(1, ID, authMid.decodedToken(req, res, next).id)
    .catch((err) => {
      throw new Error(err).message;
    });

  await couch
    .insert("users", {
      _id: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      contact: req.body.contact,
      address: req.body.address,
      org: req.body.org,
      userID: ID,
    })
    .then(
      ({ data, headers, status }) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
        console.log(data);
        console.log(status);

        res.json({
          data: data,
          message: `user  ${req.body.username} created`,
        });
      },
      (err) => {
        console.log(err);
        res.json({
          message: err,
        });
        throw new Error(err).message;

        // either request error occured
        // ...or err.code=EDOCCONFLICT if document with the same id already exists
      }
    )
    .then(() => {
      console.log(ID);
    })
    .then(() => {
      if (req.body.role == "patient") {
        console.log(
          "********************create assets if Patient ***************************"
        );

        createAssetHelper
          .createAsset(req.body, ID, authMid.decodedToken(req, res, next).id)
          .catch((err) => {
            throw new Error(err).message;
          });
      }
    })
    .catch((err) => {
      res.json({
        message: err,
      });
      exit(1);
    });

  console.log("***************************");
};

exports.getAllUsers = async (req, res, next) => {
  /**
   * admin
   */
  const mangoQuery = {
    selector: {
      _id: {
        $gt: "*",
      },
    },
  };

  const parameters = {};
  couch.mango("users", mangoQuery, parameters).then(
    ({ data, headers, status }) => {
      // data is json response
      // headers is an object with all response headers
      // status is statusCode number
      delete data;

      res
        .json({
          data,
        })
        .status(200);
      return;
    },
    (err) => {
      console.log(err);
      res
        .json({
          err,
        })
        .status(300);
      throw new Error(err).message;
      // either request error occured
      // ...or err.code=EDOCMISSING if document is missing
      // ...or err.code=EUNKNOWN if statusCode is unexpected
    }
  );
};

exports.getOneUser = async (req, res, next) => {
  console.log(`****** get one user ***********`);
  let email = req.params.email.trim();
  couch.get("users", email).then(
    ({ data, headers, status }) => {
      // data is json response
      // headers is an object with all response headers
      // status is statusCode number
      delete data.password;
      res
        .json({
          data,
        })
        .status(200);
    },
    (err) => {
      // either request error occured
      // ...or err.code=EDOCMISSING if document is missing
      // ...or err.code=EUNKNOWN if statusCode is unexpected
      res
        .json({
          message: err,
        })
        .status(300);
      return;
    }
  );
};

compare = async (pass1, pass2) => {
  return await bcrypt.compare(pass1, pass2);
};

exports.updateUser = async (req, res, next) => {
  const body = [
    "email",
    "password",
    "role",
    "username",
    "firstName",
    "lastName",
    "birthday",
    "contact",
    "address",
    "org",
  ];
  body.forEach((element) => {
    if (!req.body.hasOwnProperty(element)) {
      res.status(400).send({
        message: `${element} is require`,
      });
      // return next(`${element} is require`);

      throw new Error(`${element} is require`).message;
    }
  });

  let user = null;

  couch.get("users", req.body.email.toString().trim()).then(
    ({ data, headers, status }) => {
      // ! password

      couch
        .update("users", {
          _id: req.body._id ? req.body._id.toString().trim() : data._id,
          username: req.body.username
            ? req.body.username.toString().trim()
            : data.username,
          _rev: req.body._rev ? req.body._rev.toString().trim() : data._rev,
          firstName: req.body.firstName
            ? req.body.firstName.toString().trim()
            : data.firstName,
          lastName: req.body.lastName
            ? req.body.lastName.toString().trim()
            : data.lastName,
          role: req.body.role /***need to be with admin account */,
          password: compare(data.password, req.body.password)
            ? data.password
            : req.body.password.toString().trim(),
          lastName: req.body.lastName
            ? req.body.lastName.toString().trim()
            : data.lastName,
          address: req.body.address
            ? req.body.address.toString().trim()
            : data.address,
          contact: req.body.contact
            ? req.body.contact.toString().trim()
            : data.contact,
          birthday: req.body.birthday
            ? req.body.birthday.toString().trim()
            : data.birthday,
          userID: req.body.userID
            ? req.body.userID.toString().trim()
            : data.userID,
        })
        .then(
          ({ data, headers, status }) => {
            // data is json response
            // headers is an object with all response headers
            // status is statusCode number
            res
              .json({
                data,
              })
              .status(200);
          },
          (err) => {
            // either request error occured
            // ...or err.code=EFIELDMISSING if either _id or _rev fields are missing
            res
              .json({
                message: err,
              })
              .status(300);
            throw new Error(err).message;
          }
        );
    },
    (err) => {
      // either request error occured
      // ...or err.code=EDOCMISSING if document is missing
      // ...or err.code=EUNKNOWN if statusCode is unexpected
      res
        .json({
          message: err,
        })
        .status(300);
      return;
    }
  );
};
