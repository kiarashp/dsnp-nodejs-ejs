
// Navbar active link for menu items.

// let menu = window.document.querySelectorAll('.nav-link')
// menu.forEach(function( x ){
//     let thisHref = window.location.href
//     let hrefMenu = x.getAttribute("href")
//     if (thisHref === hrefMenu){
//         x.classList.add('navbar-active')
//     }
// })

// minislider in the slide 2
// let minislides = window.document.getElementById('minislide').getElementsByTagName('img')

// let flag = 0
// minislider()
// function minislider(){
//     for (let i=0; i<minislides.length; i++) {
//         minislides[i].classList.remove("active")
//     }
//     flag++
//     if(flag>minislides.length){flag=1}
//     minislides[flag-1].classList.add('active')
//     setTimeout(minislider,2000)
// }

let secondMinislider = window.document.getElementById('second-minislider').getElementsByTagName('img')
let parcham = 0
secondslide()
function secondslide(){
    for (let i=0; i<secondMinislider.length; i++) {
        secondMinislider[i].classList.remove("show")
    }
    parcham++
    if (parcham>secondMinislider.length){parcham=1}
    secondMinislider[parcham-1].classList.add('show')
    setTimeout(secondslide,1000)
}