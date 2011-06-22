// Redirect to login when visiting http://toledo.kuleuven.be
if(document.location.host == 'toledo.kuleuven.be') {
	document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=a';
}

// Redirect to login when visiting http(s)://netlogin.kuleuven.be
if(document.location.host == 'netlogin.kuleuven.be') {
	// Request institute from settings
	safari.self.tab.dispatchMessage("getSetting",'institute');
}

// Redirect when the institute is passed
function redirect(event){
		// We're only interested in events that provide the institute
		if(event.name !== 'institute'){
			return;
		}
		// Extract institute name
		var institute = event.message;
		alert(institute);
		// Redirect
		document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf.pl?inst=' + institute + '&lang=nl&submit=Ga+verder+%2F+Continue';
}

// Listen for message replies
safari.self.addEventListener("message", redirect, false);




