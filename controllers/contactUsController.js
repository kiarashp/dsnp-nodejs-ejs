const ContactUs = require('../models/contactUsModel')
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");
const config = require('../config')


const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: config.sendGrid
      },
    })
  );

exports.getContactUs = (req,res)=>{
    ContactUs.findOne().then(contactus=>{
        res.render('contactUs',{
            pageTitle: 'ارتباط با ما',
            path: '/contactus',
            contact: contactus,
            errorMessage: null
        })
    }).catch(err=>{
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}

exports.postContactUs = (req,res)=>{
    const errors = validationResult(req);
    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;
    if (!errors.isEmpty()) {
        return ContactUs.findOne().then(contactus=>{
            res.render('contactUs',{
                pageTitle: 'ارتباط با ما',
                path: '/contactus',
                contact: contactus,
                errorMessage: errors.array()[0].msg,
            })
        }).catch(err=>{
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
    }
    console.log(name,email,description)
    transporter.sendMail({
        to: 'kiapmd@gmail.com',
        from: "admin@dsnp.ir",
        subject: " فرم ارتباط با ما ",
        html: `<h1>${name}</h1>
        <h2>${email}</h2>
        <p>${description}</p>`,
      });
        res.redirect('contactUs')
}
