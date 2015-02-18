function showAlarmPopup() {
	$( "#mask").removeClass("hide");
	$( "#popup").removeClass("hide");
};

function hideAlarmPopup() {
	$( "#mask").addClass("hide");
	$( "#popup").addClass("hide");
};

function insertAlarm(hours, minutes, ampm, alarmName, objectID, userID) {
	var div = $("<div>");
	div.addClass("flexable");

	var alarm = $("<div>");
	alarm.addClass("name");

	alarm.html(alarmName);

	var alarmTime = $("<div>");
	alarmTime.addClass("time");
	alarmTime.html(hours + ":" + minutes + " " + ampm);

	var deleteBut = '<input id="' + objectID + '"type="button" class="delete" value="Delete" onclick="deleteAlarm(this)"/>';

	div.attr("id", objectID);
	div.append(deleteBut);
	div.append(alarm);
	div.append(alarmTime);
	$("#alarms").append(div);
};

function addAlarm() {

	var userID = "";

	FB.getLoginStatus(function(response) {
        userID = response.authResponse.userID;
    });

	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val() + "--";

	var AlarmObject = Parse.Object.extend("Alarm");
	var alarmObject = new AlarmObject();
		alarmObject.save({"userID": userID, "hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
			success: function(object) {
				insertAlarm(hours, mins, ampm, alarmName, object.id);
				hideAlarmPopup();
			}
		});
};

function deleteAlarm(button)
{
	var id = $(button).attr("id");
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.get(id, {
		success: function(results) {
			results.destroy({
				success: function(myObject) {
					$("#" + id).html("");
				}
			})
		}
	});
};

function getAllAlarms(userID) {
	Parse.initialize("ouDhoHg2GL9JoDkRrWm1g0N3wPTGt2jJc6IhBIyU", "3qJBhyLUJnQ294PuG4h6AAMPKiiNWCC5mKK4JFyZ");
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.equalTo("userID", userID);
	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				insertAlarm(results[i].attributes.hours, results[i].attributes.mins, results[i].attributes.ampm,
					results[i].attributes.alarmName, results[i].id);
			}
		}
	});
}

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
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});