$(document).ready(function() {
    // Clear local storage, form input, and search results on page load
    window.onload = function() {
        localStorage.clear();
        $("#city").val('');
        clearSearchResults();
    };

    $("#form-submit").submit(function(event) {
        performSearch(event);
    });

    function performSearch(event) {
        event.preventDefault();

        var city = $("#city").val();
        var apiKey = '2e05f57a3b196673df6bfdd46d55a39c';
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => formatSearch(data))
            .catch(error => console.error('Error:', error));
    }

    function formatSearch(jsonObject) {
        var city_name = jsonObject.name;
        var city_weather = jsonObject.weather[0].main;
        var city_temp = jsonObject.main.temp;
        var icon = jsonObject.weather[0].icon;

        $("#city_name").text("City: " + city_name);
        $("#city_weather").text("Weather: " + city_weather);
        $("#city_temp").text("Temperature: " + city_temp + "°C");
        $("#weather-icon").attr("src", `http://openweathermap.org/img/wn/${icon}.png`);
    }

    function clearSearchResults() {
        $("#city_name").text('');
        $("#city_weather").text('');
        $("#city_temp").text('');
        $("#weather-icon").attr("src", '');
    }
});
