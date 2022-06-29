const bcrypt = require("bcryptjs");

const createAssetHelper = require("./helpers/assets/createAsset");
const couch = require("../models/db");
const { exit } = require("process");
const { v4: uuidv4 } = require("uuid");
const genWallet = require("./helpers/user/genWallet");
const authMid = require("../middleware/isAuth");
exports.deleteUser = async (req, res, next) => {
  console.log(req.body);
  couch
    .del(
      "users",
      req.body.email.toString().trim(),
      req.body._rev.toString().trim()
    )
    .then(
      ({ data, headers, status }) => {
        res
          .json({
            ...data,
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
    "doctorswithpermission",
    "speciality",
    "org",
  ];
  body.forEach((element) => {
    if (!req.body.hasOwnProperty(element)) {
      res.status(400).send({
        message: `${element} is require`,
      });

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
      doctorswithpermission: req.body.doctorswithpermission,
      org: req.body.org,
      userID: ID,
      speciality: req.body.speciality,
    })
    .then(
      ({ data, headers, status }) => {
        console.log("creating user");
        res.json({
          ok: true,
          data: data,
          message: `user  ${req.body.username} created`,
        });
      },
      (err) => {
        console.log("errorr", err);
        res.json({
          ok: false,
          message: err,
        });
        throw new Error(err).message;
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
        ok: false,
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
          ok: true,
          ...data,
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
    }
  );
};

exports.getOneUser = async (req, res, next) => {
  console.log(`****** get one user ***********`);
  let email = req.params.email.trim();
  couch.get("users", email).then(
    ({ data, headers, status }) => {
      delete data.password;
      res
        .json({
          data,
        })
        .status(200);
    },
    (err) => {
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
    "doctorswithpermission",
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
          doctorswithpermission: req.body.doctorswithpermission
            ? req.body.doctorswithpermission.toString().trim()
            : data.patientswithpermission,
          userID: req.body.userID
            ? req.body.userID.toString().trim()
            : data.userID,
          speciality: req.body.speciality
            ? req.body.userID.toString().trim()
            : data.speciality,
        })
        .then(
          ({ data, headers, status }) => {
            res
              .json({
                data,
              })
              .status(200);
          },
          (err) => {
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
      res
        .json({
          message: err,
        })
        .status(300);
      return;
    }
  );
};

exports.getAllDoctors = async (req, res, next) => {
  const mangoQuery = {
    selector: {
      role: "doctor",
    },
  };

  const parameters = {};
  couch.mango("users", mangoQuery, parameters).then(
    ({ data, headers, status }) => {
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
    }
  );
};

exports.giveAcces = async (req, res, next) => {
  console.log(req.body);
  couch.get("users", req.body.PatientId.toString().trim()).then(
    ({ data, headers, status }) => {
      let permissions = [...JSON.parse(data.doctorswithpermission)];
      if (!permissions.includes(req.body.DocId)) {
        permissions.push(req.body.DocId);
      } else {
        console.log("already accessed");
      }
      couch
        .update("users", {
          ...data,
          doctorswithpermission: JSON.stringify(permissions),
        })
        .then(
          () => {
            res
              .json({
                ok: true,
              })
              .status(200);
          },
          (err) => {
            res
              .json({
                ok: false,
                message: err,
              })
              .status(300);
            throw new Error(err).message;
          }
        );
    },
    (err) => {
      res
        .json({
          ok: false,

          message: err,
        })
        .status(300);
      return;
    }
  );
};

exports.revokeAcces = async (req, res, next) => {
  console.log(req.body);
  couch.get("users", req.body.PatientId.toString().trim()).then(
    ({ data, headers, status }) => {
      let permissions = JSON.parse(data.doctorswithpermission).filter(
        (patient) => patient != req.body.DocId
      );
      console.log("permissions", permissions);
      couch
        .update("users", {
          ...data,
          doctorswithpermission: JSON.stringify(permissions),
        })
        .then(
          () => {
            res
              .json({
                ok: true,
              })
              .status(200);
          },
          (err) => {
            res
              .json({
                ok: false,
                message: err,
              })
              .status(300);
            throw new Error(err).message;
          }
        );
    },
    (err) => {
      res
        .json({
          ok: false,

          message: err,
        })
        .status(300);
      return;
    }
  );
};

exports.checkHash = async (req, res, next) => {
  const { imageHash } = require("image-hash");
  console.log(req.body)
  let match=false
  imageHash(
    "http://localhost:8081/" + req.body.image,
    16,
    true,
    async (error, data) => {
      if (req.body.hash == data) {
        match=true
      }
      res.json({ok:match})

    }
  );
};
