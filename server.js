const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const mongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const multer = require("multer");
const config = require('./config')

const erorController = require("./controllers/errorController");

//mongodb uri
const mongodb_uri = config.mongo

//session storing in mongodb
const store = new mongoDBStore({
  uri: mongodb_uri,
  collection: "sessions",
});

// add routes
const productsRoute = require("./router/products");
const homeRoute = require("./router/home");
const aboutusRoute = require("./router/aboutus");
const contactUsRoute = require("./router/contactUs");
const resumeRoute = require("./router/resume");
const expertsRoute = require("./router/experts");
const adminRoute = require("./router/admin");
const authRoute = require("./router/auth");

// run server
const app = express();

//set view engine
app.set("view engine", "ejs");

//set static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/images',express.static(path.join(__dirname, "images")));


//pars the request bodies
app.use(bodyParser.urlencoded({ extended: false }));

//set multer for handling uploading image via forms
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Math.round(Math.random() * 100000) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));

// middlewhere to console log the request
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// set session
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//setting flash
app.use(flash());

//sendin login session in every views
app.use((req, res, next) => {
  res.locals.isUserLoggedIn = req.session.loggedin;
  next();
});


// products page
app.use(productsRoute);

// experts page
app.use(expertsRoute);

// resume page
app.use(resumeRoute);

// contactUs page
app.use(contactUsRoute);
// aboutus page
app.use(aboutusRoute);

// home page
app.use(homeRoute);

// login and athentication
app.use(authRoute);

// admin pages
app.use("/admin", adminRoute);

// 500 page
app.use("/500", erorController.get500);

// 404 page
app.use(erorController.get404);

//handling other errors with 500 status
app.use((err, req, res, next) => {
  res.redirect("/500");
  console.log(err);
});

//listening to the port 4000

mongoose
  .connect(mongodb_uri)
  .then((result) => {
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
