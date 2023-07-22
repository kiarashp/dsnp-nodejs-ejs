const Expert = require("../models/expertsModel");

exports.getExperts = (req, res, next) => {
  Expert.find()
    .then((allexperts) => {
      res.render("experts", {
        pageTitle: "کارشناسان ما",
        path: "/experts",
        experts: allexperts,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
