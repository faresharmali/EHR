const bcrypt = require("bcryptjs");

const couch = require("./db");
const admin = require("../testChaincode/enrollAdmin");
couch.createDatabase("users").then(
  () => {
    console.log("data base users created");
  },
  (err) => {
    // request error occured
    console.log("data base users err :" + err);
  }
);

initRole = async () => {
  couch
    .insert("users", {
      _id: "admin@admin.com",
      password: await bcrypt.hash("password", 12),
      role: "admin",
      username: "admin",
      firstName: "admiin",
      lastName: "admiiiiin",
      birthday: "10/11/1220",
      contact: "0123456789",
      address: "tuvirt",
    })
    .then(
      ({ data, headers, status }) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
        console.log(data);
        console.log(headers);
        console.log(status);
      },
      (err) => {
        if (err.code == "EDOCCONFLICT") {
          console.log("user exsit");
        } else {
          console.log(err);
        }

        // either request error occured
        // ...or err.code=EDOCCONFLICT if document with the same id already exists
      }
    );
};

createAdmin();
admin.main();
