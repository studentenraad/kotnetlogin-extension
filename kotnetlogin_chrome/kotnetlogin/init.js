chrome.extension.sendRequest({name: "info"}, function(settings) {
		if(settings.username == ''){
			alert('Please enter your KULeuven Association credentials in the extension. Then refresh this page to have them filled in automatically.');
			return;
		}
		
		if(!settings.active){
			return;
		}

		redirect(document,settings);
		try{
			login(document,settings);
		} catch(err){
			alert('De Kotnet Login Extensie kan je niet inloggen. Heb je onlangs je wachtwoord veranderd? Verander dan aub je wachtwoord in de instellingen.');
		}
});