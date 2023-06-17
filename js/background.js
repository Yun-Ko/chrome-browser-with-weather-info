const images = Array("01.jpg","02.jpg")

const chosenImage = images[Math.floor(Math.random()*images.length)]

// const bgImage = document.createElement('img');
// bgImage.setAttribute("src",`imgs/${chosenImage}`)
// document.body.appendChild(bgImage);

document.body.style.backgroundImage=`url(imgs/${chosenImage})`
document.body.style.backgroundSize="cover"
document.body.style.backgroundRepeat="no-repeat"
