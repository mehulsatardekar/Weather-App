const inputCities = document.querySelector('#search-cities');
const countriesBtn = document.querySelector('#search-countries');
const countryWeatherDetail = document.querySelector('#result');
const errorCityMsg = document.querySelector('.error-empty-citymsg');
const weatherOfUpcomingDays = document.querySelector('#upcoming-weather-days');
const skeletonLoader = document.querySelector('.skeleton')

console.log(skeletonLoader);
const secretKey= 'a12792ef50914d1c8d4175704212409';
errorCityMsg.style.display='none'


window.addEventListener('load',()=>{
    const userInputCity = inputCities.value='Mumbai';
    getWeatherOfCountry(userInputCity);
    nextWeatherForcastOFDays(userInputCity)

})

countriesBtn.addEventListener('click',()=>{
   const userInputCity =inputCities.value;
   getWeatherOfCountry(userInputCity);
   nextWeatherForcastOFDays(userInputCity)

})
function nextWeatherForcastOFDays(userInputCity){

    const url= `https://api.weatherapi.com/v1/forecast.json?key=${secretKey}&q=${userInputCity}&days=10`;
     
    let data='';

    setTimeout(()=>{
        fetch(url).then(weatherData=>weatherData.json())
    .then(weatherData=>{
        // console.log(weatherData.forecast.forecastday.length);

        
        for(let a= 0; a<3;a++){
            console.log(weatherData.forecast.forecastday[a].hour.length);
            for(let k=0;k<weatherData.forecast.forecastday[a].hour.length;k++){
                data+=`
               
                  <tr class="text-center">
                    <td> <img class="img-thumbnail" loading="lazy" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${weatherData.forecast.forecastday[a].hour[k].condition.text}" src="${weatherData.forecast.forecastday[a].hour[k].condition.icon}" alt="" /> </td>
                    <td>${weatherData.forecast.forecastday[a].hour[k].temp_c} <span>&#8451;</td>
                    <td>${weatherData.forecast.forecastday[a].hour[k].wind_mph}</td>
                    <td>${weatherData.forecast.forecastday[a].hour[k].cloud}</td>
                    <td>${weatherData.forecast.forecastday[a].hour[k].humidity}</td>
                    <td>${weatherData.forecast.forecastday[a].hour[k].pressure_in}in</td>
                    <td>${weatherData.forecast.forecastday[a].hour[k].time}</td>
                  </tr>`
           
            weatherOfUpcomingDays.innerHTML = data;
        }
    }

    })
    },1000)
    
}

function getWeatherOfCountry(userInputCity){

    let details='', direction='';
    const url = `https://api.weatherapi.com/v1/current.json?key=${secretKey}&q=${userInputCity}&days=1`;
    

    setTimeout(()=>{
        skeletonLoader.classList.remove('skeleton');
        skeletonLoader.children.result.classList.remove('skeleton')

        if(userInputCity){
            errorCityMsg.style.display='none';
            inputCities.style.borderColor='#432C85';
        
            fetch(url)
            .then(response=>response.json())
            .then(data=>{
                switch(data.current.wind_dir){
                    case 'W':
                        direction='West';
                        break;
                    case 'E':
                        direction='East';
                        break;
                    case 'S':
                        direction="South";
                        break;
                    case 'N':
                        direction="North";
                        break;
                        default:
                        direction=data.current.wind_dir
        
                }
                details+= `<div class="row text-center">
                <div class="col-lg-6 col-md-6 col-sm-12">
                     <img src="${data.current.condition.icon}" alt="${data.current.condition.text}"/>
                    <h1 class=" font-celcius txt-col-titles">${data.current.temp_c}<span>&#8451;</span>
                    </h1>
                    <span class="txt-col">${data.current.condition.text}</span>
                    
                    <div class="row  mt-3 ">
                        <div class="col">
                            <div class="col">
                                <h6 class="txt-col">HUMIDITY</h6>
                            </div>
                            <div class="col">
                                <h6 class="txt-col">${data.current.humidity}%</h6>
                            </div>
                        </div>
                        <div class="col">
                         <div class="col">
                             <h6 class="txt-col">WIND</h6>
                         </div>
                         <div class="col">
                             <h6 class="txt-col">${data.current.wind_mph}% k/M</h6>
                         </div>
                        </div>
        
        
                        <div class="col">
                         <div class="col">
                             <h6 class="txt-col">WIND DEGREE</h6>
                         </div>
                         <div class="col">
                             <h6 class="txt-col">${data.current.wind_degree}%</h6>
                         </div>
                        </div>
        
        
                        <div class="col">
                         <div class="col">
                             <h6 class="txt-col">WIND DIRECTION</h6>
                         </div>
                         <div class="col">
                             <h6 class="txt-col">${direction}</h6>
                         </div>
                        </div>
        
                        <div class="col">
                         <div class="col">
                             <h6 class="txt-col">Farenhite</h6>
                         </div>
                         <div class="col">
                             <h6 class="txt-col">${data.current.temp_f}% <span>&#8457;</span>
                             </h6>
                         </div>
                        </div>
                    </div>
        
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                 <h1 class="font-celcius txt-col-titles">${data.location.name}</h1>
                  <div class="btm-slider hide"></div>
        
                  <div class="row mt-5 hide ">
                      <div class="col">
                         <h6 class="txt-col">City : <span>${data.location.name}</span></h6>
                         <h6 class="txt-col">Region : <span>${data.location.region}</span></h6>
                         <h6 class="txt-col">Time-Zone : <span>${data.location.tz_id}</span></h6>
                         <h6 class="txt-col">Local-Time : <span>${data.location.localtime}</span></h6>
                     </div>
                  </div>
             </div>
            </div>`
            countryWeatherDetail.innerHTML = details
        
            })
          }else{
              inputCities.style.borderColor='red';
              errorCityMsg.style.display='';
        
          }
    },1000)
 

}

