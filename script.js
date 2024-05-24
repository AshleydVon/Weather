$(document).ready(function() {
  const apiKey = '2e05f57a3b196673df6bfdd46d55a39c';

  function getWeather(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Current Weather Data:', data);  // Log the data to check its structure
        if (data.cod === 200) {  // Check if the response is successful
          updateCurrentWeather(data);
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Forecast Data:', data);  // Log the data to check its structure
        if (data.cod === "200") {  // Check if the response is successful
          updateForecast(data);
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function updateCurrentWeather(data) {
    $('#current-city').text(`${data.name} (${new Date().toLocaleDateString()})`);
    $('#current-temp').text(`Temp: ${data.main.temp}°C`);
    $('#current-wind').text(`Wind: ${data.wind.speed} MPH`);
    $('#current-humidity').text(`Humidity: ${data.main.humidity}%`);
  }

  function updateForecast(data) {
    $('#forecast').empty();
    for (let i = 0; i < data.list.length; i += 8) {  // Adjust the increment if necessary to get the right intervals
      const forecast = data.list[i];
      const card = `
        <div class="col-md-2 card">
          <h5>${new Date(forecast.dt_txt).toLocaleDateString()}</h5>
          <p>Temp: ${forecast.main.temp}°C</p>
          <p>Wind: ${forecast.wind.speed} MPH</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
        </div>
      `;
      $('#forecast').append(card);
    }
  }

  $('#form-submit').submit(function(event) {
    event.preventDefault();
    const city = $('#city').val();
    getWeather(city);
    addCityButton(city);  // Add button for the searched city
  });

  function addCityButton(city) {
    const button = $(`<button class="btn btn-secondary mb-2">${city}</button>`);
    button.click(function() {
      getWeather(city);
    });
    $('#city-buttons').append(button);
  }
});
