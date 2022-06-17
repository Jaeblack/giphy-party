
const apiKey = `sdFYh5El5PBvY2HTLpH6KAAz5zCHXtVC`
let searchParam = ``
let page = 0;
let limit = 5;
let offset = 0;


const formDiv = document.getElementById("form-gif");
const btnMore = document.getElementById('btn-more');



function addGifElement( url ){

    document.getElementById('resul').innerHTML += `
        <div class="gif">
            <img src=${url} alt="cato" >
        </div>
    `;

}

function displayResults(data){
    data.data.forEach((oneGif, index) => {
        addGifElement( data.data[index].images.original.url);
    });
}

function getOffset(){
    let newOff = page*limit;
    page += 1;
    return newOff;
}

async function fetchGifs() {

    offset = getOffset();
    response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchParam}&limit=${limit}&offset=${offset}`);
    const resul  = await response.json();
    displayResults(resul);
    document.getElementById("ipt-word").value = ``;
}


function addEventListeners(
    formElement,
    btnMoreElement
  ){
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        page = 0;
        searchParam = document.getElementById("ipt-word").value;
        if(document.getElementById('resul')){
            document.getElementById('resul').innerHTML = ``;
        }
        fetchGifs();
        if(btnMoreElement.classList.contains("hidden")){
            btnMoreElement.classList.remove("hidden")
        }
    });
    btnMoreElement.addEventListener('click', (event) => {
        event.preventDefault();
        fetchGifs();
        console.log('Yeaaah boiii');
    });
  }




window.onload = function(){
    addEventListeners(formDiv, btnMore);
}
