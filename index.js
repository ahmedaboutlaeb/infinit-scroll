imageContainer = document.getElementById('image-container')
// Unsplash API

const count = 5; //number of photos that will be requested every scroll
const apiKey = 'gH73NT3Fp8JWeFNqmNNg0eqV113neNmi4lYm-esWULY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photosArray = [];
let imageloaded=0;
let totalImages = 0;
ready = false

function imageLoaded(){
  imageloaded++
  if(imageloaded == totalImages){
    ready =true ;
  }
  loader.hidden = true;
}
function setAttributes(element, attributes){
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imageloaded = 0;
  totalImages = photosArray.length;

 
  photosArray.forEach((photo) => {
    
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
   
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
  
    item.appendChild(img);
    imageContainer.appendChild(item);
    img.addEventListener('load', imageLoaded)
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

window.addEventListener('scroll',() => {
 
 if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000  && ready){
   getPhotos()
  
 }
})


getPhotos();

