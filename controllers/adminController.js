const { validationResult } = require("express-validator");

const Expert = require("../models/expertsModel");
const Product = require("../models/products.model");

// const User = require("../models/userModel");
const AboutUs = require("../models/aboutUsModel");
const ContactUs = require("../models/contactUsModel");

exports.getAboutUs = (req, res) => {
  AboutUs.findOne().then((aboutus) => {
    res.render("admin/aboutus", {
      pageTitle: "  کنترل پنل  ",
      path: "/admin/aboutus",
      errorMessage: null,
      about: aboutus,
    });
  });
};
exports.postAboutUs = (req, res, next) => {
  const errors = validationResult(req);
  const intro = req.body.intro;
  const faradis = req.body.faradis;
  const coopl = req.body.coopl;
  const german = req.body.german;
  const flag = false;
  AboutUs.find().then((aboutus) => {
    if (!aboutus.length) {
      console.log("here i am");
      const defaultAbout = new AboutUs({
        intro: intro,
        faradis: faradis,
        coopl: coopl,
        german: german,
      });
      return defaultAbout
        .save()
        .then((r) => {
          flag = true;
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    }
  });
  if (!flag) {
    if (!errors.isEmpty()) {
      return AboutUs.findOne().then((aboutus) => {
        res.status(422).render("admin/aboutus", {
          errorMessage: errors.array()[0].msg,
          pageTitle: "  درباره ما ادمین  ",
          path: "/admin/aboutus",
          about: aboutus,
        });
      });
    }
    AboutUs.findOne().then((aboutus) => {
      aboutus.intro = intro;
      aboutus.faradis = faradis;
      aboutus.coopl = coopl;
      aboutus.german = german;
      aboutus
        .save()
        .then((r) => {
          res.redirect("/admin/aboutus");
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    });
  }
};

exports.getProducts = (req, res) => {
  res.render("admin/products", {
    pageTitle: "   همه محصولات ادمین ",
    path: "/admin/products",
  });
};

exports.getResume = (req, res) => {
  res.render("admin/resume", {
    pageTitle: "  رزومه ادمین  ",
    path: "/admin/resume",
  });
};

exports.getContactUs = (req, res) => {
  ContactUs.findOne().then((contactus) => {
    res.render("admin/contactus", {
      pageTitle: "  ارتباط با ما ادمین  ",
      path: "/admin/contactus",
      contact: contactus,
      errorMessage: null,
    });
  });
};

exports.postContactUs = (req, res, next) => {
  const errors = validationResult(req);
  const address = req.body.address;
  const phone = req.body.phone;
  const fax = req.body.fax;
  const whatsapp = req.body.whatsapp;
  const flag = false;
  console.log(address, phone, fax, whatsapp);
  ContactUs.find().then((contactus) => {
    if (!contactus.length) {
      const defaultText = new ContactUs({
        address: address,
        phone: phone,
        fax: fax,
        whatsapp: whatsapp,
      });
      return defaultText
        .save()
        .then((r) => {
          flag = true;
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    }
  });
  if (!flag) {
    if (!errors.isEmpty()) {
      return ContactUs.findOne().then((contactus) => {
        res.status(422).render("admin/contactus", {
          errorMessage: errors.array()[0].msg,
          pageTitle: "  ارتباط با ما ادمین  ",
          path: "/admin/contactus",
          contact: contactus,
        });
      });
    }
    ContactUs.findOne().then((contactus) => {
      contactus.address = address;
      contactus.phone = phone;
      contactus.fax = fax;
      contactus.whatsapp = whatsapp;
      contactus
        .save()
        .then((r) => {
          res.redirect("/admin/contactus");
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    });
  }
};

exports.getAdmin = (req, res) => {
  res.render("admin/admin", {
    pageTitle: "  کنترل پنل  ",
    path: "/admin",
    username: req.session.user.name,
  });
};

exports.getExperts = (req, res, next) => {
  Expert.find()
    .then((allexperts) => {
      res.render("admin/experts", {
        pageTitle: " مشاهده همه کارشناسان/ صفحه ادمین",
        path: "/admin/experts",
        experts: allexperts,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditExpert = (req, res, next) => {
  const epxertId = req.params.expertId;
  Expert.findById(epxertId)
    .then((expert) => {
      res.render("admin/edit-expert", {
        errorMessage: null,
        pageTitle: "صفحه ادمین",
        path: "/admin/edit-expert",
        expert: expert,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditExpert = (req, res, next) => {
  const errors = validationResult(req);
  const epxertId = req.body.expertId;
  const name = req.body.name;
  const phone = req.body.phone;
  const mail = req.body.mail;
  const description = req.body.description;
  const telegramurl = req.body.telegramurl;
  const whatsappurl = req.body.whatsappurl;
  const image = req.file;

  Expert.findById(epxertId)
    .then((expert) => {
      if (!errors.isEmpty()) {
        return res.status(422).render("admin/edit-expert", {
          errorMessage: errors.array()[0].msg,
          pageTitle: " ویرایش کارشناس ",
          path: "/admin/edit-expert",
          expert: expert,
        });
      }
      expert.name = name;
      expert.phone = phone;
      expert.mail = mail;
      expert.description = description;
      if (image) {
        console.log(image.path);
        const imagePath = image.path; // example file path with backslashes
        const normalizedPath = imagePath.replace(/\\/g, "/"); // replace backslashes with forward slashes
        console.log(normalizedPath);
        expert.imageurl = normalizedPath;
      }
      expert.telegramurl = telegramurl;
      expert.whatsappurl = whatsappurl;
      return expert.save().then((result) => {
        console.log("expert updated👍");
        res.redirect("/admin/experts");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddExpert = (req, res) => {
  res.render("admin/add-expert", {
    oldInput: {
      name: "",
      phone: "",
      mail: "",
      description: "",
      telegramurl: "",
      whatsappurl: "",
    },
    errorMessage: null,
    pageTitle: " صفحه اضافه کردن کارشناس  ",
    path: "/admin/add-expert",
  });
};

exports.postAddExpert = (req, res, next) => {
  const errors = validationResult(req);
  const name = req.body.name;
  const phone = req.body.phone;
  const mail = req.body.mail;
  const description = req.body.description;
  const image = req.file;
  const telegramurl = req.body.telegramurl;
  const whatsappurl = req.body.whatsappurl;
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/add-expert", {
      errorMessage: errors.array()[0].msg,
      pageTitle: " اضافه کردن یک کارشناس ",
      path: "/admin/add-expert",
      oldInput: {
        name: name,
        phone: phone,
        mail: mail,
        description: description,
        telegramurl: telegramurl,
        whatsappurl: whatsappurl,
      },
    });
  }
  if (!image) {
    return res.status(422).render("admin/add-expert", {
      errorMessage: "عکس را با فرمت درست آپلود کنید.",
      pageTitle: "صفحه اضافه کردن کارشناس",
      path: "/admin/add-expert",
      oldInput: {
        name: name,
        phone: phone,
        mail: mail,
        description: description,
        telegramurl: telegramurl,
        whatsappurl: whatsappurl,
      },
    });
  }
  const imageurl = image.path;
  const expert = new Expert({
    name: name,
    phone: phone,
    mail: mail,
    description: description,
    imageurl: imageurl,
    telegramurl: telegramurl,
    whatsappurl: whatsappurl,
  });
  expert
    .save()
    .then((result) => {
      console.log("New expert added successfully😊");
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteExpert = (req, res, next) => {
  const expertId = req.body.expertId;
  Expert.findByIdAndRemove(expertId)
    .then((result) => {
      console.log("the expert Deleted forever😵");
      res.redirect("/admin/experts");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = async (req, res, next) => {
  try {
    const abzarProducts = await Product.find({ category: "ابزار دقیق" });
    const elementProducts = await Product.find({ category: "المنت" });
    res.render("admin/products", {
      pageTitle: " مشاهده همه محصولات/ صفحه ادمین",
      path: "/admin/products",
      abzarProducts: abzarProducts,
      elementProducts: elementProducts,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    oldInput: {
      title: "",
      category: "",
      description: "",
      image: "",
      whatsappurl: "",
    },
    errorMessage: null,
    pageTitle: " صفحه اضافه کردن محصول  ",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  const image = req.file;
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/add-product", {
      errorMessage: errors.array()[0].msg,
      pageTitle: " اضافه کردن یک محصول ",
      path: "/admin/add-product",
      oldInput: {
        title: title,
        category: category,
        description: description,
      },
    });
  }
  if (!image) {
    return res.status(422).render("admin/add-product", {
      errorMessage: "عکس را با فرمت درست آپلود کنید.",
      pageTitle: "صفحه اضافه کردن محصول",
      path: "/admin/add-product",
      oldInput: {
        title: title,
        category: category,
        description: description,
      },
    });
  }
  const imageurl = image.path;
  const product = new Product({
    title: title,
    category: category,
    description: description,
    imageurl: imageurl,
  });
  product
    .save()
    .then((result) => {
      console.log("New Product added successfully😊");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("admin/edit-product", {
        errorMessage: null,
        pageTitle: "صفحه ویرایش محصول",
        path: "/admin/edit-product",
        product: product,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const errors = validationResult(req);
  const productId = req.body.productId;
  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  const image = req.file;

  Product.findById(productId)
    .then((product) => {
      if (!errors.isEmpty()) {
        return res.status(422).render("admin/edit-product", {
          errorMessage: errors.array()[0].msg,
          pageTitle: " ویرایش محصول ",
          path: "/admin/edit-product",
          product: product,
        });
      }
      product.title = title;
      product.category = category;
      product.description = description;
      if (image) {
        const imagePath = image.path; // example file path with backslashes
        const normalizedPath = imagePath.replace(/\\/g, "/"); // replace backslashes with forward slashes
        product.imageurl = normalizedPath;
      }
      return product.save().then((result) => {
        console.log("produc updated👍");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByIdAndRemove(productId)
    .then((product) => {
      console.log("the expert Deleted forever😵");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
