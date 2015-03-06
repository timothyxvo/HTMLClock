function getTime() {
	var time = new Date();
	document.getElementById("time").innerHTML = time.toLocaleTimeString();
	window.setTimeout("getTime()", 1000);
}

window.onload = function() {
  

   var obj = {"client_id":"1133a9f7c0025e5", 
   "client_type":"token", 
   "callback_function":"https://api.imgur.com/3/account/me/" };
   init(obj);
};