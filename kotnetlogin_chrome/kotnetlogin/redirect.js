// Redirect to login when visiting http://toledo.kuleuven.be
if(document.location.host == 'toledo.kuleuven.be') {
	document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=a';
}

// Redirect to the association
pickAssociation = function(institute) {
    document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf.pl?inst=' + institute + '&lang=nl&submit=Ga+verder+%2F+Continue';
}

// Check if we are on the netlogin wayf page
if (document.location.href == 'https://netlogin.kuleuven.be/' || document.location.href == 'http://netlogin.kuleuven.be/') {
	// request settings
	chrome.extension.sendRequest({name: "info"}, function(response) {
		// If the extension is active, pick the institute set in the settings
		pickAssociation(response.inst);
	});
}
	
	 