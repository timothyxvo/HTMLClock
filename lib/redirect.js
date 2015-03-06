function redirect_init() {
	
	var params = {}, queryString = location.hash.substring(1),
	    regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	  localStorage.setItem(decodeURIComponent(m[1]), params[decodeURIComponent(m[1])]);
	}
	window.opener.callback();
	window.close();
}

redirect_init();

