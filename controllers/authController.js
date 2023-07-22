const crypto = require("crypto");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const config = require('../config')
// const session = require("express-session");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { error } = require("console");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.sendGrid
    },
  })
);

exports.getLogin = (req, res) => {
  let errorM = req.flash("error");
  if (errorM.length > 0) {
    message = errorM[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: " صفحه ورود ادمین ",
    path: "/login",
    errorMessage: message,
    oldInput: { name: "", password: "" },
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      pageTitle: " صفحه ورود ادمین ",
      path: "/login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          pageTitle: " صفحه ورود ادمین ",
          path: "/login",
          errorMessage: "  ایمیل نادرست است ",
          oldInput: {
            email: email,
            password: password,
          },
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.loggedin = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              console.log("you logged in 👻");
              res.redirect("/admin");
            });
          }
          res.status(422).render("auth/login", {
            pageTitle: " صفحه ورود ادمین ",
            path: "/login",
            errorMessage: " پسوردت یه چی دیگه بود ",
            oldInput: {
              email: email,
              password: password,
            },
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/experts");
  });
};

exports.getSignup = (req, res) => {
  let errorM = req.flash("error");
  if (errorM.length > 0) {
    message = errorM[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: " صفحه ثبت نام ",
    path: "/signup",
    errorMessage: message,
    oldInput: {
      name: "",
      email: "",
      password: "",
      confirmp: "",
    },
    redAlerts: [],
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: " صفحه ثبت نام ",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        name: name,
        email: email,
        password: password,
        confirmp: req.body.confirmp,
      },
      redAlerts: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedpass) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedpass,
      });
      return user.save();
    })
    .then((result) => {
      console.log("the new user just added 😉😉😉");
      res.redirect("/signup");
      return transporter.sendMail({
        to: email,
        from: "admin@dsnp.ir",
        subject: "signup completed",
        html: `<h1>hello ${name} you just sign up succeccfully`,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getResetPass = (req, res) => {
  let errorM = req.flash("error");
  if (errorM.length > 0) {
    message = errorM[0];
  } else {
    message = null;
  }
  res.render("auth/resetpass", {
    pageTitle: " تغییر رمز ",
    path: "/resetpass",
    errorMessage: message,
  });
};

exports.postResetPass = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/resetpass");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "  اکانتی با این ایمیل پیدا نشد ");
          return res.redirect("/resetpass");
        }
        user.resetToken = token;
        user.resetTokenExpireatoin = Date.now() + 3600000;
        return user.save().then((result) => {
          res.redirect("/");
          transporter.sendMail({
            to: req.body.email,
            from: "admin@dsnp.ir",
            subject: "you asked for reset password",
            html: `<h1>hello you just asked for your password to be reset</h1>
          click on this link <a href="http://localhost:4000/newpass/${token}"> reset my password </a> to set your new password`,
          });
        });
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPass = (req, res) => {
  let token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpireatoin: { $gt: Date.now() },
  })
    .then((user) => {
      let errorM = req.flash("error");
      if (errorM.length > 0) {
        message = errorM[0];
      } else {
        message = null;
      }
      res.render("auth/newpass", {
        pageTitle: " رمز جدید را وارد کنید ",
        path: "/newpass",
        errorMessage: message,
        userId: user._id.toString(),
        passToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPass = (req, res, next) => {
  let newpass = req.body.pass;
  let userId = req.body.userId;
  let token = req.body.passToken;
  let theUser;
  User.findOne({
    resetToken: token,
    resetTokenExpireatoin: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      theUser = user;
      return bcrypt.hash(newpass, 12);
    })
    .then((hashedpass) => {
      theUser.password = hashedpass;
      theUser.resetToken = undefined;
      theUser.resetTokenExpireatoin = undefined;
      return theUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
