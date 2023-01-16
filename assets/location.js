let contador = 1;
let Url = `https://rickandmortyapi.com/api/location/1`;
let totalPages;
let residents = []
let residentContainer = document.getElementById("residentContainer");


fetchData()

function fetchData() {

    fetch(Url)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(err => console.log('error', err));
}

function mostrarDatos(data) {

    let locationData = document.getElementById("LocationData")

        residents = data.residents;

        locationData.innerHTML = `
        <h1> ${data.id}-Residents of <strong>${data.name}</strong> </h1>
        <h2> ${data.dimension}</h2>
        <h2> ${data.type}</h2>
        `    
    if(residents.length == 0 || residents == null){

        let residentDiv = document.createElement("div")
        residentDiv.classList.add("col-md-3");
        residentDiv.style.marginBottom = "450px";

        residentContainer.innerHTML = `
        <h1 class="text-white"> <strong> NO CHARACTERS IN THIS LOCATION </strong></h1>
        `
        residentContainer.appendChild(residentDiv)
    }

    for(let i=0;i<residents.length;i++){

        let residentDiv = document.createElement("div")
        residentDiv.classList.add("col-md-3");
        
        fetch(residents[i])
            .then(response => response.json())
            .then(data => {             
                residentDiv.innerHTML = `
                        <div class="card mb-4 mt-3 text-white border border-info-subtle">
                            <div class="row">
                            <div class="col-md-6">
                                <img src="${data.image}" class="img-fluid ImgApi" alt="...">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body text-center">
                                <p class="card-title fs-4 fw-bold mt-5"> ${data.name}  </p><br>
                                <p class="fs-5"> <strong>Status:</strong> ${data.status} </p>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    `  
                residentContainer.appendChild(residentDiv)
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

        fetch(`https://rickandmortyapi.com/api/location/${contador}`)
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

    fetch(`https://rickandmortyapi.com/api/location/${contador}`)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(err => console.log('error', err));
    
    console.log(contador);
}

//Reiniciar tabla.
function resetTable() {
    while (residentContainer.hasChildNodes()) {
        residentContainer.removeChild(residentContainer.firstChild);
    }
}

//Reset Contador
function CounterManager(_contador){
    if(_contador < 1){
        _Toast("No more content")
        contador = 1;
    } 

    if(_contador > 126){
        _Toast("No more content")
        contador = 126;
    } 
}