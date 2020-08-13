const search = document.getElementById("searchCity");
const matchList = document.getElementById("match-list");

//Search cities
const searchCities = async searchText => {
    const res = await fetch("../data/city.list.json");
    const cities = await res.json();

    //Get matches to current input
    let matches = cities.filter(city => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return city.name.match(regex) || city.country.match(regex)
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    outputHtml(matches);
}

//results in html
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `<div class="card card-body mb-1">
        <h4>${match.name} (${match.country}) <span class="text-primary">${match.name}</span></h4>
        <small>Lat: ${match.coord.lat} / Long: ${match.coord.lon}`);
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchCities(search.value));