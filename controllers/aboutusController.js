const Aboutus = require('../models/aboutUsModel')

exports.getaboutus = (req,res)=>{
    Aboutus.findOne().then(aboutus=>{
        res.render('aboutus',{
            pageTitle: 'درباره ما',
            path: '/aboutus',
            about: aboutus
        })
    }).catch(err=>{
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}
