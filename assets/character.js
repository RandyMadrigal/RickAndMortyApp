let Url = 'https://rickandmortyapi.com/api/character?page=1'
let nextUrl;
let prevUrl;
let totalPages;
let divRow = document.getElementById("dataContainer");
let inputCharacter = document.getElementById("inputCharacter")
let filterBtn = document.getElementById("filter");
filterBtn.addEventListener("click", filterData)


fetchData();

function fetchData() {
    fetch(Url)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(err => console.log('error', err));
}

function mostrarDatos(data) {

    data.results.forEach(item => {

        let divItem = document.createElement("div")
        divItem.classList.add("col-md-6");

        divItem.innerHTML = `
        <div class="card mb-4 mt-3 text-white border border-info-subtle">
                    <div class="row">
                      <div class="col-md-5">
                        <img src="${item.image}" class="img-fluid ImgApi" alt="...">
                      </div>
                      <div class="col-md-7">
                        <div class="card-body text-start">
                          <p class="card-title fs-4 fw-bold">${item.id}- ${item.name}</p><br>
                          <p class="text-start fs-5"> <strong>Status:</strong> ${item.status}</p>
                          <p class="text-start fs-5"> <strong>Gender:</strong> ${item.gender}</p>
                          <p class="text-start fs-5"> <strong>Species:</strong> ${item.species}</p>
                          <p class="text-start fs-5"><strong>Origin location:</strong> ${item.origin.name}</h3>
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

    if (nextUrl === null || nextUrl === undefined) {
        _Toast("no more content")
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
        _Toast("No more content")
    }

    if (prevUrl != null) {

        resetTable()

        fetch(prevUrl)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(err => console.log('error', err));
    }
}

//Reiniciar tabla.
function resetTable() {
    while (divRow.hasChildNodes()) {
        divRow.removeChild(divRow.firstChild);
    }
}

//Mostrar datos del personaje filtrado
function filterData() {

    let parameterName = inputCharacter.value

    resetTable();

    //Trae la data de la Pagina numero 1
    if (parameterName == null) {
        fetch(Url)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(err => console.log('error', err));
    }

    if (parameterName != null) {

        fetch(`https://rickandmortyapi.com/api/character/?name=` + parameterName)
            .then(response => response.json())
            .then(data => mostrarDatos(data))             
            .catch(err => { 
                console.log('error', err),
                _Toast("Not Found!")
            });
    }

    inputCharacter.value = "";
}







