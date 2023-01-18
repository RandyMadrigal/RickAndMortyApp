let contador = 1;
let Url = `https://rickandmortyapi.com/api/episode/1`;
let character = []
let episodeContainer = document.getElementById("episodeContainer");

fetchData()

function fetchData() {

    fetch(Url)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(err => console.log('error', err));
}

function mostrarDatos(data) {

    let episodeData = document.getElementById("episodeData")

    character = data.characters;

    episodeData.innerHTML = `
        <h1> Cap: ${data.id} - <strong>${data.name}</strong></h1>
        <h2> ${data.air_date}</h2>
        <h2> episode: ${data.episode}</h2>
        `    
    if(character.length == 0 || character == null){

        let episodeDiv = document.createElement("div")
        episodeDiv.classList.add("col-md-3");
        episodeDiv.style.marginBottom = "450px";

        residentContainer.innerHTML = `
        <h1 class="text-white"> <strong> NO CHARACTERS IN THIS LOCATION </strong></h1>
        `
        episodeContainer.appendChild(episodeDiv)
    }

    for(let i=0;i<character.length;i++){

        let episodeDiv = document.createElement("div")
        episodeDiv.classList.add("col-md-4");
        
        fetch(character[i])
            .then(response => response.json())
            .then(data => {             
                episodeDiv.innerHTML = `
                        <div class="card mb-4 mt-3 text-white border border-info-subtle">
                            <div class="row">
                            <div class="col-md-6">
                                <img src="${data.image}" class="img-fluid ImgApi" alt="...">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body text-center">
                                <p class="card-title fs-4 fw-bold mt-5"> ${data.id} - ${data.name}  </p><br>
                                <p class="fs-5"> <strong>Status:</strong> ${data.status} </p>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    `  
                    episodeContainer.appendChild(episodeDiv)
            })
            .catch(err => console.log('error', err));
    }
}

function _Toast(errorText) {

     let option = {
         animation: true,
         delay: 1000
     }

     const divToast = document.getElementById("ToastMessage");
     const message = new bootstrap.Toast(divToast, option)

     const text = document.getElementById("errorText")
     text.innerHTML = `
     <strong>WAIT - </strong>${errorText}
     `
     message.show();
}

//Siguiente pagina 
function next() {

        resetTable()
        
        ++contador;

        CounterManager(contador)

        fetch(`https://rickandmortyapi.com/api/episode/${contador}`)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(err => console.log('error', err));

        console.log(contador);
}

//Pagina anterior
function prev() {

    resetTable()

    --contador;
        
    CounterManager(contador)

    fetch(`https://rickandmortyapi.com/api/episode/${contador}`)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(err => console.log('error', err));
    
    console.log(contador);
}

//Reiniciar tabla.
function resetTable() {
    while (episodeContainer.hasChildNodes()) {
        episodeContainer.removeChild(episodeContainer.firstChild);
    }
}

//Reset Contador
function CounterManager(_contador){
    if(_contador < 1){
        _Toast("No more content")
        contador = 1;
    } 

    if(_contador > 51){
        _Toast("No more content")
        contador = 51;
    } 
}