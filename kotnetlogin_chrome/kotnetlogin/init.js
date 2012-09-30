//Send request for settings and start working
chrome.extension.sendRequest({name: "info"}, function(settings) {
	// Extension is currently disabled
	if(!settings.active){
		return;
	}


	// No credentials were filled in yet, inform user
	if(settings.username == ''){
		alert(chrome.i18n.getMessage("error_noUsername"));
		return;
	}

	// Redirect if applicable
	redirect(document,settings);

	// Try to login
	try{
		login(document,settings);
	} catch(err){
		// Inform user of wrong credentials
		alert(chrome.i18n.getMessage("error_loginFailed"));
	}
});