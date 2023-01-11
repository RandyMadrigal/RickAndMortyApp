let Url = 'https://rickandmortyapi.com/api/character?page=1'
let nextUrl;
let prevUrl;
let totalPages;

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");


fetch(Url)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(err => console.log('error', err));


const mostrarDatos = (data) => {

    data.results.map(item => {

        let divRow = document.getElementById("dataContainer");
        let divItem = document.createElement("div")
        divItem.classList.add("col-md-4");

        divItem.innerHTML = `
        <div class="card mb-2 bg-dark text-white">
                    <div class="row">
                      <div class="col-md-4">
                        <img src="${item.image}" class="rounded mx-auto d-block ImgApi" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${item.name}</h5>
                          <p class="card-text">${item.gender}</p>
                          <p class="card-text"><small>${item.status}</small></p>
                        </div>
                      </div>
                    </div>
                  </div>`

        divRow.appendChild(divItem);
    })
}



/*
//Siguiente pagina 
function next() {

    if (nextUrl == null) {
        alert("Error")
    }

    if (nextUrl != null) {

        resetTable()

        fetch(nextUrl)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(err => console.log('error', err));
    }
}

//Pagina anterior
function prev() {

    if (prevUrl == null) {
        alert("Error")
    }

    if (prevUrl != null) {

        resetTable()

        fetch(prevUrl)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(err => console.log('error', err));
    }
}

//Eliminar contenido de la tabla
function resetTable() {
    while (tBody.hasChildNodes()) {
        tBody.removeChild(tBody.firstChild);
    }
}
*/






