let Url = 'https://rickandmortyapi.com/api/character?page=1'
let nextUrl;
let prevUrl;
let totalPages;
let divRow = document.getElementById("dataContainer");


fetch(Url)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(err => console.log('error', err));


const mostrarDatos = (data) => {

    data.results.map(item => {

        let divItem = document.createElement("div")
        divItem.classList.add("col-md-4");

        divItem.innerHTML = `
        <div class="card mb-3 text-white border border-info-subtle">
                    <div class="row">
                      <div class="col-md-4">
                        <img src="${item.image}" class="img-fluid ImgApi" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body text-start">
                          <h5 class="card-title">${item.id} - ${item.name}</h5><br>
                          <h3"> <strong> Status:</strong> ${item.status}</h3><br>
                          <h3"> <strong>Gender:</strong> ${item.gender}</h3><br>
                          <h3"> <strong>Species:</strong> ${item.species}</h3><br>
                          <h3"> <strong>Origin location:</strong> ${item.origin.name}</h3><br>
                          
                        </div>
                      </div>
                    </div>
                  </div>`

        divRow.appendChild(divItem);
    })

    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    totalPages = data.info.pages;

}

//Siguiente pagina 
function next() {

    if (nextUrl === null || nextUrl === undefined) {
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

    if (prevUrl === null || prevUrl === undefined) {
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



function resetTable() {
    while (divRow.hasChildNodes()) {
        divRow.removeChild(divRow.firstChild);
    }
}







