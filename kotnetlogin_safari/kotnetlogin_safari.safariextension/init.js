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
		alert('Vul a.u.b. uw KULeuven Associatie inloggegevens in bij de opties van de extensie. Vernieuw daarna deze pagina om automatisch in te loggen.');
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
		alert('De Kotnet Login Extensie kan u niet inloggen. Hebt u onlangs uw wachtwoord veranderd? Verander dan a.u.b. het wachtwoord in de opties.');
	}
}, false);

// Request settings from global HTML page
safari.self.tab.dispatchMessage("getSettings",null);