function getTime() {
	var time = new Date();
	document.getElementById("time").innerHTML = time.toLocaleTimeString();
	window.setTimeout("getTime()", 1000);
}

window.onload = function() {
   getTime();
};