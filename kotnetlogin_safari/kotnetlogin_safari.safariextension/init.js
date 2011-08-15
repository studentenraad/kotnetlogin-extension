// Listen for the settings to arrive from the global HTML page
safari.self.addEventListener("message", function(response){
	// We are only interested in messages containing settings
	if(response.name != "settings"){
		return;
	}
	// extract settings from the response
	var settings = response.message;
	
	// The user has not yet set his/her credentials, we can't do anything useful but inform the user of this situation.
	if(settings.username == ''){
		alert('Please enter your KULeuven Association credentials in the extension. Then refresh this page to have them filled in automatically.');
		return;
	}
	
	// If the extension is inactive, we exit
	// Currently the if-condition is always false. If apple would allow us to provide some userfriendly toggle button, this piece of code becomes relevant
	if(!settings.active){
		return;
	}
	// Redirect if necessary
	redirect(document,settings);
	
	// Try to login, an exception occurs when the page contains an indication that the credentials are wrong. Inform the user if this happens.
	try{
		login(document,settings);
	} catch(err){
		alert('De Kotnet Login Extensie kan je niet inloggen. Heb je onlangs je wachtwoord veranderd? Verander dan aub je wachtwoord in de instellingen.');
	}
}, false);

// Request settings from global HTML page
safari.self.tab.dispatchMessage("getSettings",null);