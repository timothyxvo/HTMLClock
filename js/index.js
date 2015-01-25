var getColor = function(max) {
	if(max < 60) {
		return "cold";
	}
	else if(max >= 60) {
		return "chilly";
	}
	else if(max >= 70) {
		return "nice";
	}
	else if(max >= 80) {
		return "warm";
	}
	else if(max >= 90) {
		return "hot";
	}
};

function getTemp() {
	
	var weatherAPI = "https://api.forecast.io/forecast/265dce62012862debaa4506a86ed3eb6/37.8267,-122.423?callback=?"


	$.getJSON( weatherAPI, 
		function (json) {
			$( "#forecastLabel").html(json.daily.summary);
			$( "#forecastIcon").attr("src", "img/" + json.daily.icon + ".png");
			var arr = json.daily.data;
			var max = 0;
			for(i = 0; i < arr.length; i++) {
				if(arr[i].temperatureMax > max) {
					max = arr[i].temperatureMax;
				}
			}
			var color = getColor(max);
			$( "body").addClass(color);

		});
};

getTemp();