var client_id;
var client_type;
var callback_function;

var client_secret = 'dd29e40f4b9e365b7a6a1faaada2d093144959b8';
var auth_url = 'https://api.imgur.com/oauth2/authorize';
var token_url = 'https://api.imgur.com/oauth2/token';


var OAuth = function(data) {
	var client_id = data.client_id;
	var response_type = data.response_type;
}

function init(json) {

	client_id = json.client_id;
	client_token = json.type_response;
	callback_function = json.callback_function;
	alert(client_id);
	alert(client_token);
	alert(callback_function);
}

function login() {
	var auth_url = 'https://api.imgur.com/oauth2/authorize?';
	var queryParams = ['client_id=' + client_id,
	'response_type=token',
	'state=' + 'thisiswhatido'];
	var query = queryParams.join('&');
	var url = auth_url + query; 
	var myWindow = window.open(url, "", "width=500, height=500");
	redirect_init();
}

function callback() {
	
	var url = 'https://api.imgur.com/3/account/me';

	$.ajax({
		type: 'GET',
		url: url,
		headers: {"Authorization" : "Bearer " + localStorage.access_token}
	}).done(function(data) {
		alert("Hello " + data.data.url);
	}).fail(function(data) {
		console.log("Error");
	});
}