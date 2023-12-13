const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const currentWeatherData = document.querySelector(".current-weather");
let currentDate =  dayjs().format('MMM-DD-YYYY');
const API_KEY ="313e19582894eb8e201b929fa986e291";
const cityList =[];
const weatherCardsDiv = document.querySelector(".weather-cards");
//<button class="location-btn">Use Current Location</button>

const current_Location = document.querySelector(".location-btn");
//let contHistEl = document.querySelector('.cityHist');

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
        
       // console.log(data);
        //console.log(data.name);
        //console.log((((data.main.temp- 273.15) * 9/5) + 32).toFixed(0)+"°F");
        //console.log(data.main.humidity);
        $('.weather-detail h3').text(citiName.toUpperCase()+" ("+currentDate+")");
        $('.2').text((((data.main.temp- 273.15) * 9/5) + 32).toFixed(0)+"°F");
        $('.3').text(data.wind.speed);
        $('.4').text(data.main.humidity);
        $('img').attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
        $('.weather-icon h4').text(data.weather[0].description);
        
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

    let foreCastDataList=[];
      console.log(data);
      const fiveDay_forecast=[];
       for (let i = 0; i < data.list.length; i++) {
        //console.log("---"+data.list[i].dt_txt);
        const  foreCastDate = new Date(data.list[i].dt_txt).getDate();

        if(!fiveDay_forecast.includes(foreCastDate))
        {
          fiveDay_forecast.push(foreCastDate); 
          foreCastDataList.push(data.list[i]);
        }
       
       }
     
     

       for (let index = 0; index < fiveDay_forecast.length; index++) {
       $('.card'+index+' h3').text(foreCastDataList[index].dt_txt.split(" ")[0]);
       var url_icon = "https://openweathermap.org/img/wn/"+foreCastDataList[index].weather[0].icon+"@2x.png";
       $('.card'+index+' img').attr('src',url_icon);
       $(('.card'+index)+ ' .2').text((((foreCastDataList[index].main.temp- 273.15) * 9/5) + 32).toFixed(0)+"°F");
      $(('.card'+index)+ ' .3').text(foreCastDataList[index].wind.speed);
      $(('.card'+index)+ ' .4').text(foreCastDataList[index].main.humidity);
    // console.log(foreCastDataList[index]);
      
      
     }
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

         const data_object = {
          cityName: name,
          latitude: lat,
          longtitude: lon
          }; 
           cityList.push(data_object);
       
          localStorage.setItem(name, JSON.stringify(cityList));


           getWeather(cityName,lat,lon);
           getForecast(lat,lon);
           getHistory(cityName);

          
         

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

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
      position => {
          const { latitude, longitude } = position.coords; // Get coordinates of user location
          // Get city name from coordinates using reverse geocoding API
          const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
          fetch(API_URL).then(response => response.json()).then(data => {
              const { name } = data[0];
              getWeather(name,latitude,longitude);
            getForecast(latitude,longitude);
          }).catch(() => {
              alert("An error occurred while fetching the city name!");
          });
      },
      error => { // Show alert if user denied the location permission
          if (error.code === error.PERMISSION_DENIED) {
              alert("Geolocation request denied. Please reset location permission to grant access again.");
          } else {
              alert("Geolocation request error. Please reset location permission.");
          }
      });
}


var contHistEl = $('.cityHist');
function getHistory(citiName) {
	//contHistEl.empty();



    var x = document.createElement("BUTTON");

      var t = document.createTextNode(citiName);
      x.setAttribute("class","histBtn");
      x.appendChild(t);
      contHistEl.appendChild(x);

  
      

     
//Allows the buttons to start a search as well
$('.histBtn').on("click", function (event) {
  event.preventDefault();
  

  var retrievedObject = localStorage.getItem(name);
  
  // CONVERT STRING TO REGULAR JS OBJECT
  var parsedObject = JSON.parse(retrievedObject);
  
  // ACCESS DATA
  console.log();
  
   
     getWeather(cityName,parsedObject[0].latitude,parsedObject[0].longtitude);
     getForecast(parsedObject[0].latitude,parsedObject[0].longtitude);
});
     
  
      
	

}
//.cityHist
/*
$(":button").on("click", function (event) {
  event.preventDefault();

var retrievedObject = localStorage.getItem(name);

// CONVERT STRING TO REGULAR JS OBJECT
var parsedObject = JSON.parse(retrievedObject);

// ACCESS DATA
console.log();

 
   getWeather(cityName,parsedObject[0].latitude,parsedObject[0].longtitude);
   getForecast(parsedObject[0].latitude,parsedObject[0].longtitude);

});

*/
searchButton.addEventListener('click',getCitylocation);
current_Location.addEventListener('click',getUserCoordinates);

