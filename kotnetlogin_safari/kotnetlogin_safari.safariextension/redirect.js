// Key to send with requests for information
var REDIRECT_KEY = 'redirect';

// Redirect to login when visiting http://toledo.kuleuven.be
if(document.location.host == 'toledo.kuleuven.be') {
	document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=a';
}

// Redirect to login when visiting http(s)://netlogin.kuleuven.be
if(document.location.href == 'https://netlogin.kuleuven.be/' || document.location.href == 'https://netlogin.kuleuven.be/campusnet/' || document.location.href == 'https://netlogin.kuleuven.be/cgi-bin/netlogout.pl') {
	// Request institute from settings
	if(document.location.href.indexOf('wayf.pl') == -1){
		safari.self.tab.dispatchMessage("getInfo",REDIRECT_KEY);
	}
}

// Redirect when the institute is passed
function redirect(event){
		// We're only interested in events triggered by our request
		if(event.name !== REDIRECT_KEY){
			return;
		}
		// Extract institute name
		var institute = event.message.institute;
		// Redirect
		document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf.pl?inst=' + institute + '&lang=nl&submit=Ga+verder+%2F+Continue';
}

// Listen for message replies
safari.self.addEventListener("message", redirect, false);