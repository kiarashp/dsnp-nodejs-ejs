exports.getHome = (req,res)=>{
    res.render('home',{
        pageTitle: 'دقت سنجش نوین پویا',
        path: '/'
    })
}