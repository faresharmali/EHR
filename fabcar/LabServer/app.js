const path = require("path");
const swaggerUi = require("swagger-ui-express");
const multer = require("multer");
const swaggerDocument = require("./swagger.json");
const fs = require('fs');

const express = require("express");
require("dotenv").config({
  path: path.resolve(__dirname + "/.env"),
});
var cors = require("cors");
// routes
const authRouter = require("./routes/authRouter");
const assetRouter = require("./routes/assetRouter");
const userRouter = require("./routes/userRouter");
const { getMaxListeners, mainModule } = require('process');


const isAuth = require('./middleware/isAuth');


const app = express();
app.use(express.static(__dirname + './uploads'));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/uploads', /* isAuth.requireAuth,*/ express.static(__dirname + '/uploads'));

app.use("/uploads", /* isAuth.requireAuth,*/ express.static("uploads"));

////http://localhost:8081/uploads/madjid/image-1650875371242.png

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};



const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads');
    }


    if (!fs.existsSync('./uploads/' + req.params.mrID)) {
      fs.mkdirSync('./uploads/' + req.params.mrID);
    }
    cb(null, './uploads/' + req.params.mrID);




  },

  filename: function (req, file, cb) {
    const targetPath = file.fieldname + '-' + Date.now() + path.extname(file.originalname);// you can change name here
    cb(null, targetPath);


    const tempPath = file.path;



    // if (path.extname(file.originalname).toLowerCase() === ".png") {
    //   fs.rename(tempPath, targetPath, err => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(200)
    //       .contentType("text/plain")
    //       .end("File uploaded!");
    //   });
    // } else {
    //   fs.unlink(tempPath, err => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(403)
    //       .contentType("text/plain")
    //       .end("Only .png files are allowed!");
    //   });
    // }

  }
});



const upload = multer({
  dest: "./uploads/*",
  storage: storage,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    if (ext !== '.png') {
      return callback(new Error('Only PNG images are allowed'));
    }
    callback(null, true);
  },

});







/// <input type="file" name="image" />.
app.post(
  "/upload/:mrID",
  //upload.single("image" /* name attribute of <file> element in your form */), //single to upload one image
  upload.array("image" /* name attribute of <file> element in your form */), //single to upload array image

  (req, res) => {

    // const email = "madjidsmail@gmail.com";
    // var dir = `./uploads/${email}`;//userID OR EMAIL
    res.send({ message: "images updated" });

   
  }
);






const storage2= multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload2 = multer({ storage: storage2 }).single('image')


app.use("/api/auth/", authRouter);
app.use("/api/upload", (req,res)=>{
upload2(req, res, (err) => {
  if (err) {
    console.log(err)
    res.sendStatus(500);
  }
  res.send(req.file);
});

});





app.use("/api/asset/", assetRouter);
app.use("/api/user/", userRouter);

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
process.setMaxListeners(0);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

// connect to db

// const MONGOOSE_URI = `mongodb+srv://awalnaADmin:${process.env.MONGO_PASS}@cluster0.2dyrx.mongodb.net/${process.env.MONGO_DB}?`;
// mongoose
//   .connect(MONGOOSE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   })
//   .then((result) => {
//     app.listen(process.env.PORT || 8080);
//   })
//   .catch((err) => console.log(err));
app.use(express.static('images'));
app.use('/static',express.static('/images'));



try {
  app.listen(process.env.PORT || 8081);
  console.log("up and running on port " + (process.env.PORT || 8081));
} catch (error) { }
