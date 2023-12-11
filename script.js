const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const currentWeatherData = document.querySelector(".current-weather");
let currentDate =  dayjs().format('MMM-DD-YYYY');
const API_KEY ="313e19582894eb8e201b929fa986e291";
const cityList =[];

function getWeather(citiName,latitude,longtitude)
{
   var time = displayTime();
  
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}`;
    fetch(WEATHER_URL)
    .then(function(response)
    {
        return response.json();
    })
    .then(function(data){
      //  console.log(citiName);
        
        console.log(data);
        console.log(data.name);
        console.log((((data.main.temp- 273.15) * 9/5) + 32).toFixed(0)+"°F");
        console.log(data.main.humidity);
        $('.weather-detail h3').text(citiName.toUpperCase()+" ("+currentDate+")");
        $('.2').text((((data.main.temp- 273.15) * 9/5) + 32).toFixed(0)+"°F");
        $('.3').text(data.wind.speed);
        $('.4').text(data.main.humidity);
        $('img').attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
        $('.weather-icon h4').text(data.weather[0].description);
        


        /*
             <div class = 'current-weather'>
              <section class = "weather-detail">
                <h3 id="1">London (12/08/2023)</h3>
                <h4 id="2">Temp: 76.62</h4>
                <h4 id="3">Wind: 100</h4>
                <h4 id="4">Humidity: 300</h4>
              </section>
              <section class ='weather-icon'>
                <img src="https://openweathermap.org/img/wn/10d@4x.png" alt="weather-icon">
                <h4>Sunny</h4>
              </section>
          </div>
           $(this).attr("src", "images/card-front.jpg");

src should be in quotes:

$('.img1 img').attr('src');



        */
    })
}


function getForecast(lat1,lon1)
{
  
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon1}&appid=${API_KEY}`;

  fetch(FORECAST_URL)
  .then(function(response)
  {
      return response.json();
  })
  .then(function(data){
    //  console.log(citiName);
      const foreCastList =[];
      //let foreCastDate;
      let foreCastDataList=[];
      console.log(data);
      const fiveDays = data.list.filter(forecast=>
        {
        const  foreCastDate = new Date(forecast.dt_txt).getDate();
         // console.log(foreCastDate);
          if(!foreCastList.includes(foreCastDate))
          {
            return foreCastList.push(foreCastDate);
          }

        });
        console.log(fiveDays);
   
   
      
  })
}




function getCitylocation()
{
      
        var cityName = cityInput.value.trim();
        if(!cityName) return; 
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

        fetch(GEO_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data)
        {
            if(!data.length)
            return alert (`${cityName} is invalid, please re-check the input`);
      //  var namecity =data[0].name;
       // console.log("name: "+namecity);
            //console.log(data);
           const {name,lat,lon} =data[0];
         //    console.log("Name: "+ name);
         //  console.log("Lat: "+lat);
         //   console.log("Long: "+lon);
          //  cityList.push(name);
           // localStorage.setItem('city',JSON.stringify(cityList));
         //  getWeather(cityName,lat,lon);
           getForecast(lat,lon);
        })
        .catch(()=>
        {
            alert("An error occured while fetching the coordinates!");
        });

     

}


const displayTime = function()
{
var rightNow = dayjs().format('MMM DD, YYYY');

//setInterval(displayTime,1000);
console.log(rightNow);
}


searchButton.addEventListener('click',getCitylocation);

