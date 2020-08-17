const search = document.getElementById("searchCity");
const matchList = document.getElementById("match-list");
const setCards = document.querySelector("#match-list");
const btnSetCity = document.getElementById("btnSetCity");

const loading = document.getElementById("loading")
const data = document.getElementById("data")

var citySelected = {};
var matches = [];
var cities = {};

//  -------------------------------------------------------
//  Functions.
//  -------------------------------------------------------

//init - Function: intialice the controls
const init = () => {

    data.style.visibility = "hidden"
    loading.style.visibility = "hidden"
}

//start - Function: Checking if we had set LocalCity, 
const start = () => {
    //Checking if we have the locla city in Local storage
    let localCity = localStorage.getItem("name_localCity")
    if (localCity.length > 0) {
        window.open("info.html", "_self");
    } else {
        //hidding the info
        data.style.visibility = "hidden"
        loading.style.visibility = "visible"
        loadCities();
    }

}

//load cities
const loadCities = async () => {
    const res = await fetch("city.list.min.json");
    cities = await res.json();

    data.style.visibility = "visible"
    loading.style.display = "none"
}

//Search cities
const searchCities = searchText => {
    //Get matches to current input
    matches = cities.filter(city => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return city.name.match(regex) || city.country.match(regex)
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }
    // console.log(matches)
    outputHtml(matches);
}

//outputHtml - function: Show the results in html
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `<div class="card card-body mb-1" id="d${match.id}">
        <h4 id="h${match.id}">${match.name} (${match.country}) <span id="s${match.id}" class="text-primary">${match.state}</span></h4>
        <small id="m${match.id}" >Lat: ${match.coord.lat} / Long: ${match.coord.lon}</small></div>`).join('');
        matchList.innerHTML = html;
    }
}

// setlocalstorage - function : save the seleceted city into the localStorage
const setLocalStorage = () => {
    //Saving the local city in the LocalStorage
    localStorage.setItem("id_localCity", search.getAttribute("id_city"))
    localStorage.setItem("name_localCity", search.getAttribute("name_city"))
    localStorage.setItem("lat_localCity", search.getAttribute("lat_city"))
    localStorage.setItem("lon_localCity", search.getAttribute("lon_city"))
}

//  -------------------------------------------------------
//  Events.
//  -------------------------------------------------------

// input - Event:click - Whe the user type in the input, search inside of the cities loaded, in live
search.addEventListener('input', () => searchCities(search.value));

//setCards - Event: click - When the user click on the card (city card), set the info 
setCards.addEventListener('click', e => {
    if (e.target.id.length > 0 && e.target.id != "match-list") {

        search.setAttribute("id_city", e.target.id.substring(1, e.target.id.length))

        citySelected = matches.find(city => { return city.id == parseInt(search.getAttribute("id_city")) })
        search.value = `${citySelected.name} (${citySelected.country}) ${citySelected.state} `
        matchList.innerHTML = "";

        search.setAttribute("name_city", citySelected.name)
        search.setAttribute("lat_city", citySelected.coord.lat)
        search.setAttribute("lon_city", citySelected.coord.lon)

        setLocalStorage();

    }

});

//click - event - open the window with the info of city selected
btnSetCity.addEventListener('click', () => {
    window.open("info.html", "_self");
})

//  -------------------------------------------------------
//  Execution Secuence.
//  -------------------------------------------------------

init();
start();
