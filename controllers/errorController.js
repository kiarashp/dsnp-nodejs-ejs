exports.get404 = (req,res)=>{
    res.status(404).render('404',{
        path: '404',
        pageTitle: 'صفحه درخواستی یافت نشد!!!'
    })
}

exports.get500 = (req,res)=>{
    res.status(500).render('500',{
        path: '500',
        pageTitle: ' متاسفانه مشکلی در بارگذاری صفحه درخواستی شما به وجود آمده است!!!'
    })
}