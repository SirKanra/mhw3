const carousel = document.getElementById('carosello');
const leftButton = document.querySelector('.button-carosello-sinistra');
const rightButton = document.querySelector('.button-carosello-destra');


let currentIndex = 0;

const visibleImages = 6;


function Carosello() {
    const items = carousel.querySelectorAll('.img-block');
    items.forEach((item, index) => {

        if (index >= currentIndex && index < currentIndex + visibleImages) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none'; 
        }
    });
}

leftButton.addEventListener('click', () => {
    const items = carousel.querySelectorAll('.img-block');
    currentIndex = (currentIndex - 1 + items.length) % items.length; 
    Carosello();
});


rightButton.addEventListener('click', () => {
    const items = carousel.querySelectorAll('.img-block');
    currentIndex = (currentIndex + 1) % items.length; 
    Carosello();
});

// Inizializza il carosello
Carosello();

const button = document.querySelector(".button-hover-sinistra");
var i;

let isExpanded = false; 

function one(event) {
    const elements = document.getElementsByClassName("column");
    if (!isExpanded) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.flex = "10%";
        }
        isExpanded = true; 
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.flex = ""; 
        }
        isExpanded = false; 
    }
}
button.addEventListener("click", one);

const hamMenu = document.querySelector("#menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

/*--------------------------------------*/
//api
const API_KEY_PEXEL = 'roDeRd9kjvKfwIcR8EzqaqpTm3Yv1zbk71zD2ACpz6cvrC2UnH1O3mbZ';
const API_URL = 'https://api.pexels.com/v1/search?query=nature&per_page=10';

fetch(API_URL, {
    headers: {
        Authorization: API_KEY_PEXEL
    }
})
.then(response => response.json())
.then(data => {console.log(data.photos); 
    const row = document.getElementById('row'); 
    const column = document.createElement('div'); 
    column.classList.add('column'); 

    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.classList.add('flex-item'); 
        imgElement.src = photo.src.medium; 
        column.appendChild(imgElement); 
    });

    row.appendChild(column); 
})

const API_URL_MET = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=art';

fetch(API_URL_MET)
    .then(response => response.json())
    .then(data => {
        console.log(data.objectIDs); 
        const row = document.getElementById('row'); 
        const column = document.createElement('div'); 
        column.classList.add('column'); 

        
        const objectIDs = data.objectIDs.slice(0, 15);

        objectIDs.forEach(objectID => {

            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
                .then(response => response.json())
                .then(objectData => {console.log(objectData);
                    const imgElement = document.createElement('img');
                    imgElement.classList.add('flex-item'); 
                    imgElement.src = objectData.primaryImageSmall || 'https://via.placeholder.com/150'; 
                    imgElement.alt = objectData.title || 'Opera d\'arte senza titolo';

                    column.appendChild(imgElement);
                })
        });

        row.appendChild(column);
    })
    

