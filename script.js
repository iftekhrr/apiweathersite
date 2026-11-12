// OpenWeatherMap API Key: 59173e0afdf074da7ce56c16a019ce5e
// api.openweathermap.org/data/2.5/weather
// http://api.openweathermap.org/data/2.5/weather?q=New York,US&appid=YOUR_KEY&units=imperial

$(document).ready(function () {
  var key = "59173e0afdf074da7ce56c16a019ce5e";

  function getWeather(city) {
    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      key +
      "&units=imperial";

    $.getJSON(url, function (json) {
      console.log(json);

      var html = "";
      html += "<h2>" + json.name + "</h2>";
      html += '<img src="https://openweathermap.org/img/wn/' + json.weather[0].icon + '@2x.png">';
      html += '<p class="temp">' + Math.round(json.main.temp) + "°F</p>";
      html += "<p>" + json.weather[0].description + "</p>";
      html += "<p>Feels like: " + Math.round(json.main.feels_like) + "°F</p>";
      html += "<p>Humidity: " + json.main.humidity + "%</p>";
      html += "<p>Wind: " + Math.round(json.wind.speed) + " mph</p>";

      $("#weather").html(html);

      getForecast(city);
    }).fail(function () {
      $("#weather").html("<p>Could not load the weather. Check your API key.</p>");
    });
  }

  // 5 day forecast (one reading per day around noon)
  function getForecast(city) {
    var url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      key +
      "&units=imperial";

    $.getJSON(url, function (json) {
      console.log(json);

      var html = '<div class="forecast"><h3>Next 5 days</h3>';

      for (var i = 0; i < json.list.length; i++) {
        var item = json.list[i];
        if (item.dt_txt.indexOf("12:00:00") !== -1) {
          var day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
          html += "<p>" + day + ": " + Math.round(item.main.temp) + "°F, " + item.weather[0].main + "</p>";
        }
      }

      html += "</div>";
      $("#weather").append(html);
    });
  }

  $("#nyc").click(function () {
    getWeather("New York,US");
  });

  $("#dhaka").click(function () {
    getWeather("Dhaka,BD");
  });

  // show New York when the page first loads
  getWeather("New York,US");
});
