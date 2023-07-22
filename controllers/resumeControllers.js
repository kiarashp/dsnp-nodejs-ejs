exports.getResume = (req,res)=>{
    res.render('resume',{
        pageTitle: 'رزومه ما',
        path: '/resume'

    })
}
