//Load cities
var citiesFile = "../resources/city.list.json"
function loadCities() {
    //
    fetch(citiesFile)
        .then(responseCities => responseCities.json())
        .then(cities => {
            cities.forEach(element => {
                let city = document.createElement("option")
                city.setAttribute("data-subtext", `${element.country}`)
                city.textContent = `${element.name}`
                document.getElementById("citiesList").appendChild(city);

            });
            console.table(cities);
        })
}

loadCities();