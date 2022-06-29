const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const express = require("express");
require("dotenv").config({
  path: path.resolve(__dirname + "/.env"),
});
var cors = require("cors");
// routes
const authRouter = require("./routes/authRouter");
const assetRouter = require("./routes/assetRouter");
const userRouter = require("./routes/userRouter");
const testRouter =require("./routes/testRoute")

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/api/auth/", authRouter);
app.use("/api/asset/", assetRouter);
app.use("/api/user/", userRouter);
app.use("/api/test/", testRouter);


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

try {
  app.listen(process.env.PORT || 8080);
  console.log("up and running on port " + (process.env.PORT || 8080));
} catch (error) { }
