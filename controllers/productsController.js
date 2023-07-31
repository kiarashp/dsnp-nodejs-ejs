const Product = require("../models/products.model");

exports.getproducts = async(req,res,next)=>{
    try {
        const abzarProducts = await Product.find({ category: "ابزار دقیق" });
        const elementProducts = await Product.find({ category: "المنت" });
        res.render("products", {
          pageTitle: " مشاهده همه محصولات",
          path: "products",
          abzarProducts: abzarProducts,
          elementProducts: elementProducts,
        });
      } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      }
}
