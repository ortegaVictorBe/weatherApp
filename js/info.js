//calling the API
let cityName = localStorage.getItem("name_localCity");
let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e4dfa41e22f93aa72d2e80838a3bb930`


var cityWeatherInfo = {};
var cityWeatherInfoDaily = [];
var dateNow = new Date();


const getWeatherData = async () => {

    const res = await fetch(url);
    cityWeatherInfo = await res.json();

    // let url2=`http://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
    // exclude=hourly,daily&appid={YOUR API KEY}`
    let url2 = `http://api.openweathermap.org/data/2.5/onecall?lat=${cityWeatherInfo.coord.lat}&lon=${cityWeatherInfo.coord.lon}&units=metric&
    exclude=hourly,minutely&appid=e4dfa41e22f93aa72d2e80838a3bb930`

    const resDaily = await fetch(url2);
    cityWeatherInfoDaily = await resDaily.json();

    console.log(cityWeatherInfo);
    console.log(cityWeatherInfoDaily);
    paintData();

}

const paintData = () => {
    //Genral Section
    paintGeneral();
    //Daily
    paintDaily();

}

const paintGeneral = () => {
    //console.log(cityWeatherInfo.base);
    let nameCity = cityWeatherInfo.name
    let date = dateNow.toDateString();
    let icon = cityWeatherInfo.weather[0].icon;
    let temp = Math.floor(cityWeatherInfo.main.temp - 273.15)
    let tempMin = Math.floor(cityWeatherInfo.main.temp_min - 273.15)
    let tempMax = Math.floor(cityWeatherInfo.main.temp_max - 273.15)
    let feelsLike = Math.floor(cityWeatherInfo.main.feels_like - 273.15)

    //New Elements
    let image = document.createElement("img");
    let temperature = document.createElement("h2");
    let descResume = document.createElement("small");

    document.getElementById("cityName").innerText = nameCity;
    document.getElementById("date").innerHTML = `${date}<br>${cityWeatherInfo.weather[0].main}`;

    image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    document.getElementById("picture").appendChild(image);

    temperature.textContent = `${temp}°C`
    document.getElementById("temp").appendChild(temperature);

    descResume.innerHTML = `${tempMax}°/${tempMin}°  Feels like ${feelsLike}° <br> ${cityWeatherInfo.weather[0].description}`
    document.getElementById("descInfo").appendChild(descResume);
}

const paintDaily = () => {

    let dailyArray = cityWeatherInfoDaily.daily;
    let detailTable = document.getElementById("detailTable")
    let nameDays = ["Mon", "Sun", "Tue", "Wen", "Thu", "Fri", "Sat"];
    // let day = new Date(dateNow);


    dailyArray.forEach((element, index) => {
        let day = new Date(dateNow);
        day.setDate(day.getDate() + index);
        // day = new Date(dateNow.setDate(dateNow.getDate() + index));

        let iconImg = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png}`
        // <img src="http://openweathermap.org/img/wn/02d@2x.png" class="max-width: 50%;" >
        // <img src="http://openweathermap.org/img/wn/${iconImg}@2x.png">

        detailTable.innerHTML += `<tr class="table-warning">                               
            <td>${nameDays[day.getDay()]}</td>
            <td>${element.temp.min}°c</td>
            <td>${element.temp.max}°c</td>
          </tr> `

    });

    console.table(dailyArray)

}

getWeatherData();
