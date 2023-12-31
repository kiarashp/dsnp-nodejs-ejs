const products = [
    {
        id: 0,
        category: 'ابزار دقیق',
        title: 'ترموکوپل های دما',
        description: 'ترموکوپل‌های دماترموکوپل سنسوری برای اندازه‌گیری دما میباشد. این سنسور از دو مغزی فلزی ناهمنام تشکیل شده که در انتهای کار به یکدیگر وصل شدند. برای خواندن اطلاعات ترموکوپل نیاز به کنترلر و یا نمایشگر دما است. وقتی قسمت اتصالی دو سیم با توجه به محیط سرد و یا گرم میشود تغییر ولتاژ میدهد و این تغییرات نشان دهنده‌ی دمای محیطی است که ترموکوپل در آنجا قرار گرفته.'
    },
    {
        id: 1,
        category: 'ابزار دقیق',
        title: 'سنسورهای RTD',
        description: 'سنسورهای RTD سنسور RTD یا Resistance Temperature Detector به معنی حسگر مقاومتی حرارت، این سنسورها دارای یک مقاومت بوده که مقدار مقاومتش با توجه به تغییرات دما تغییر می کند. این سنسورها چندین سال است که در آزمایشگاه‌ها و صنعت استفاده می شوند و به عنوان دقیقترین و پایدارترین سنسور دما شناخته می شوند.'
    },
    {
        id: 2,
        category: 'المنت',
        title: 'المنت میله ای',
        description: 'این نوع المنت از پر مصرف ‌ترین انواع المنت های موجود در بازار است در عوض انتقال گرمای بسیار خوبی دارد چه به صورت تابشی چه به صورت هدایتی.'
    },
    {
        id: 3,
        category: 'المنت',
        title: 'المنت سرامیکی',
        description: 'المنت سرامیکی نسبت به المنت های دیگر طول عمر بیشتر و تولید گرمای متعادل تری دارد.'
    }

]
const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "ابزار دقیق"
    },
    description:    {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    }
})
module.exports= mongoose.model('Product',productSchema)