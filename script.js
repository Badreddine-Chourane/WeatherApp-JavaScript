// Task 1: Handle Button Clicks
const bgButton = document.getElementById("bg-button");

bgButton.addEventListener("click", () => {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  document.body.style.backgroundColor = randomColor;
});

// Task 2: Form Submission
const textForm = document.getElementById("textForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const phoneInput = document.getElementById("phoneInput");
const formResult = document.getElementById("formResult");
const list = document.getElementById("list");

textForm.addEventListener("submit", (event) => {
  // 2. for submition handling
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !password || !phone) {
    alert("Please fill in all the fields.");
    return;
  }

  // 3. display submitted data
  //first solution
  const p = document.createElement("p");
  //     <p></p>
  p.innerText=`name: ${name} ,email: ${email}, phone: ${phone}`;
  p.style.color="green"
  /*  <p>
        name: ${name} ,email: ${email}, 
        phone: ${phone}, password: ${password}
      </p>
  */
  const formResult = document.getElementById("formResult");
  formResult.appendChild(p);
  //second solution
  // formResult.innerHTML=`<p> name: ${name} ,email: ${email}, 
  // phone: ${phone}, password: ${password} </p>`
 
const li = document.createElement("li");
li.innerHTML = `<span> ${email} </span> <button>Remove</button>`;
list.appendChild(li);

setTimeout( () =>{
  p.innerText=""

},3000)
})
list.addEventListener("click",(event)=>{
  console.log(event.target.tagName)
  if(event.target.tagName=="BUTTON"){
    event.target.parentElement.remove()
  }
})





function getWeather() {
    const apiKey = '6205d7906858301570517b935a160dcc';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block';
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
