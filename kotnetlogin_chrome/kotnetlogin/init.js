// Send request for settings and start working
chrome.extension.sendRequest({name: "info"}, function(settings) {
		// No credentials were filled in yet, inform user
		if(settings.username == ''){
			alert('Please enter your KULeuven Association credentials in the extension settings. Then refresh this page to have them filled in automatically.');
			return;
		}
		
		// Extension is currently disabled
		if(!settings.active){
			return;
		}
		
		// Redirect if applicable
		redirect(document,settings);
		
		// Try to login
		try{
			login(document,settings);
		} catch(err){
			// Inform user of wrong credentials
			alert('De Kotnet Login Extensie kan je niet inloggen. Heb je onlangs je wachtwoord veranderd? Verander dan aub je wachtwoord in de instellingen.');
		}
});