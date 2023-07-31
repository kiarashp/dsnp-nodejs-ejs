const express = require("express");

const { check, body } = require("express-validator");
const router = express.Router();

const adminController = require("../controllers/adminController");
const isauth = require("../middleware/isAuth");

// Admin main
router.get("/", isauth, adminController.getAdmin);

// Admin About us
router.get("/aboutus", isauth, adminController.getAboutUs);
router.post(
  "/edit-about",
  [
    body("intro", "مقدمه خالی است").notEmpty(),
    body("faradis", "فرادیس خالی است").notEmpty(),
    body("coopl", "کوپل خالی است").notEmpty(),
    body("german", "ژرمن خالی است").notEmpty(),
  ],
  isauth,
  adminController.postAboutUs
);

// Admin Products Routs
router.get("/products", isauth, adminController.getProducts);

// Admin Resume
router.get("/resume", isauth, adminController.getResume);

// Admin Contact us
router.get("/contactus", isauth, adminController.getContactUs);
router.post(
  "/edit-contact",
  [
    body("address", "آدرس خالی است").notEmpty(),
    body("phone", "تلفن خالی است").notEmpty(),
    body("fax", "فکس خالی است").notEmpty(),
    body("whatsapp", "واتس آپ خالی است").notEmpty(),
  ],
  isauth,
  adminController.postContactUs
);

// Admin Experts Routs
router.get("/experts/:expertId", isauth, adminController.getEditExpert);
router.post(
  "/edit-expert",
  [
    body("name", "نام خالی است").notEmpty(),
    body("phone", "تلفن خالی است").notEmpty(),
    body("mail", "ایمیل خالی است").notEmpty(),
    body("description", "توضیحات خالی است").notEmpty(),
  ],
  isauth,
  adminController.postEditExpert
);
router.get("/experts", isauth, adminController.getExperts);
router.get("/add-expert", isauth, adminController.getAddExpert);
router.post(
  "/add-expert",
  [
    body("name", "نام خالی است").notEmpty(),
    body("phone", "تلفن خالی است").notEmpty(),
    body("mail", "ایمیل خالی است").notEmpty(),
    body("description", "توضیحات خالی است").notEmpty(),
  ],
  isauth,
  adminController.postAddExpert
);
router.post("/delete-expert", isauth, adminController.postDeleteExpert);

// Admin Products Routs
router.get("/products", isauth, adminController.getProducts);
router.get("/add-product", isauth, adminController.getAddProduct);
router.post(
  "/add-product",
  [
    body("title", "عنوان خالی است").notEmpty(),
    body("category", "دسته بندی خالی است").notEmpty(),
    body("description", "توضیحات خالی است").notEmpty(),
  ],
  isauth,
  adminController.postAddProduct
);
router.get("/products/:productId", isauth, adminController.getEditProduct);
router.post(  "/edit-product",
  [
    body("title", "عنوان خالی است").notEmpty(),
    body("category", "دسته بندی خالی است").notEmpty(),
    body("description", "توضیحات خالی است").notEmpty(),
  ],
  isauth,
  adminController.postEditProduct
);
router.post("/delete-product", isauth, adminController.postDeleteProduct);

module.exports = router;
