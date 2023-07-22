exports.getproducts = (req,res)=>{
    res.render('products',{
        pageTitle: 'محصولات ما',
        path: '/products'
    })
}
