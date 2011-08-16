// Redirect the browser when needed
// document: the javascript document object of the current page
// settings: a map containing at least the institute
function redirect(document,settings){
 	// Redirect to login when visiting http://toledo.kuleuven.be
	if(document.location.host == 'toledo.kuleuven.be') {
		document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=a';
	}

	// Redirect to login/logout page when visiting netlogin on campusnet or kotnet
	if(document.location.href == 'https://netlogin.kuleuven.be/' || document.location.href == 'https://netlogin.kuleuven.be/campusnet/' || document.location.href == 'https://netlogin.kuleuven.be/cgi-bin/netlogout.pl') {
		// Redirect to login page of the institute in the settings
		document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf.pl?inst=' + settings.institute + '&lang=nl&submit=Ga+verder+%2F+Continue';
	}	
}