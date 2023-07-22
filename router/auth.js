const express = require("express");
const { check, body } = require("express-validator");
const User = require("../models/userModel");

const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [check("email").isEmail().withMessage(" لطفا ایمیل خود را وارد کنید ").normalizeEmail(),
body('password').trim().isAlphanumeric()],
  authController.postLogin
);
router.post("/logout", authController.postLogout);

// signup get and post
// router.get("/signup", authController.getSignup);

// router.post(
//   "/signup",
//   [
//     check("email")
//       .isEmail()
//       .withMessage("  لطفا ایمیل درست وارد کنید! ")
//       .custom((value, { req }) => {
//         return User.findOne({ email: value }).then((result) => {
//           if (result) {
//             return Promise.reject(
//               " با این ایمیل قبلا کس دیگری ثبت نام کرده است "
//             );
//           }
//         });
//       }),
//     body("password", "لطفا پسورد را درست وارد کنید")
//       .isLength({ min: 6 })
//       .isAlphanumeric()
//       .trim(),
//     body("confirmp")
//       .trim()
//       .custom((value, { req }) => {
//         if (value !== req.body.password) {
//           throw new Error(" پسوردها با هم یکسان نیستند ");
//         }
//         return true;
//       }),
//   ],
//   authController.postSignup
// );
router.get("/resetpass", authController.getResetPass);
router.post("/resetpass", authController.postResetPass);
router.get("/newpass/:token", authController.getNewPass);
router.post("/newpass", authController.postNewPass);

module.exports = router;
