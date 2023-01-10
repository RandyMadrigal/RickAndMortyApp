let Url = 'https://rickandmortyapi.com/api/character?page=1'
let nextUrl;
let prevUrl;
let totalPages;
let filterUrl;
let arr = []

const tBody = document.getElementById("tabla");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const inputName = document.getElementById("InputName");
const filterhBtn = document.getElementById("filter");

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
filterhBtn.addEventListener("click", filter);

fetch(Url)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(err => console.log('error', err));

//Crea elementos del Dom para mostrar la info
const mostrarDatos = (data) => {

    for (let i = 0; i < data.results.length; i++) {

        if (data.results[i].type == "") {
            data.results[i].type = "-"
        }

        nextUrl = data.info.next;
        prevUrl = data.info.prev;
        totalPages = data.info.pages;

        let tr = document.createElement("tr");
        tr.setAttribute = ("id", "tr" + [i])
        tBody.appendChild(tr);

        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdGender = document.createElement("td");
        let tdStatus = document.createElement("td");
        let tdSpecies = document.createElement("td");
        let tdType = document.createElement("td");
        let tdLastLocation = document.createElement("td");
        let tdOrigin = document.createElement("td");
        let tdDetails = document.createElement("td");

        let iD = document.createTextNode(data.results[i].id);
        let name = document.createTextNode(data.results[i].name);
        let Gender = document.createTextNode(data.results[i].gender);
        let status = document.createTextNode(data.results[i].status);
        let species = document.createTextNode(data.results[i].species);
        let Type = document.createTextNode(data.results[i].type);
        let origin = document.createTextNode(data.results[i].origin.name);
        let LastLocation = document.createTextNode(data.results[i].location.name);

        let details = document.createElement("button")
        details.innerHTML = "info"
        details.setAttribute("class", "btn btn btn-info")
        details.setAttribute("type", "button")

        tdId.appendChild(iD);
        tdName.appendChild(name);
        tdGender.appendChild(Gender);
        tdStatus.appendChild(status);
        tdSpecies.appendChild(species);
        tdType.appendChild(Type);
        tdOrigin.appendChild(origin);
        tdLastLocation.appendChild(LastLocation);
        tdDetails.appendChild(details);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdGender);
        tr.appendChild(tdStatus);
        tr.appendChild(tdSpecies);
        tr.appendChild(tdType);
        tr.appendChild(tdOrigin);
        tr.appendChild(tdLastLocation);
        tr.appendChild(tdDetails);
    }
}

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

//Filtro
function filter() {

    let contador = 0;

    while (contador < totalPages) {

        fetch(`https://rickandmortyapi.com/api/character?page=${contador}`)
            .then(response => response.json())
            .then((data) => filterData(data))
            .catch(err => console.log('erroooor', err));

        contador++;
    }

    console.log(arr)

    if (arr.length == 0) {

        resetTable()

        alert("no hay datos")

        fetch(Url)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(err => console.log('error', err));

    } else {

        filterUrl = `https://rickandmortyapi.com/api/character/${arr}`

        //alert(filterUrl)

        fetch(filterUrl)
            .then(response => response.json())
            .then((data) => mostrarFilterData(data))
            .catch(err => console.log('erroooor', err));

    }
}

//Verifica si el texto introducido se encuentra en la pagina actual, para realizar el filtro
const filterData = (data) => {

    for (let i = 0; i < data.results.length; i++) {

        if (data.results[i].name.includes(inputName.value)) {

            arr.push(data.results[i].id)
        }
    }

    return arr;
}

//Mostrar la informacion del contenido filtrado.
function mostrarFilterData(data) {

    resetTable()

    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement("tr");
        tr.setAttribute = ("id", "tr" + [i]);
        tBody.appendChild(tr);

        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdGender = document.createElement("td");
        let tdStatus = document.createElement("td");
        let tdSpecies = document.createElement("td");
        let tdType = document.createElement("td");
        let tdLastLocation = document.createElement("td");
        let tdOrigin = document.createElement("td");
        let tdDetails = document.createElement("td");

        let iD = document.createTextNode(data[i].id);
        let name = document.createTextNode(data[i].name);
        let Gender = document.createTextNode(data[i].gender);
        let status = document.createTextNode(data[i].status);
        let species = document.createTextNode(data[i].species);
        let Type = document.createTextNode(data[i].type);
        let origin = document.createTextNode(data[i].origin.name);
        let LastLocation = document.createTextNode(data[i].location.name);

        let details = document.createElement("button")
        details.innerHTML = "info"
        details.setAttribute("class", "btn btn btn-info")
        details.setAttribute("type", "button")

        tdId.appendChild(iD);
        tdName.appendChild(name);
        tdGender.appendChild(Gender);
        tdStatus.appendChild(status);
        tdSpecies.appendChild(species);
        tdType.appendChild(Type);
        tdOrigin.appendChild(origin);
        tdLastLocation.appendChild(LastLocation);
        tdDetails.appendChild(details);


        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdGender);
        tr.appendChild(tdStatus);
        tr.appendChild(tdSpecies);
        tr.appendChild(tdType);
        tr.appendChild(tdOrigin);
        tr.appendChild(tdLastLocation);
        tr.appendChild(tdDetails);

    };

}

//Eliminar contenido de la tabla
function resetTable() {
    while (tBody.hasChildNodes()) {
        tBody.removeChild(tBody.firstChild);
    }
}







