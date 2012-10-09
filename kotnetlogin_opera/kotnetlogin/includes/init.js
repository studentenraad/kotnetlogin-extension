//==UserScript==
//@include *://*.kuleuven.be/*
//@include *://*.groept.be/*
//@include *://limo.libis.be/*
//@include *://*.hubrussel.be/*
//@include *://*.katho.be/*
//@include *://*.khbo.be/*
//@include *://*.khleuven.be/*
//@include *://*.khlim.be/*
//@include *://*.lessius.eu/*
//@include *://*.wenk.be/*
//@include *://*.khk.be/*
//@include *://*.kahosl.be/*
//==/UserScript==

function init(locale) {
	var settings = widget.preferences;

	if(settings.active == 'false'){
		return;
	}

	// No credentials were filled in yet, inform user
	if(settings.username == null || settings.username == ''){
		switch (locale) {
		case "en":
			alert("Please enter your KULeuven Association credentials in the extension settings. Then refresh this page to login automatically.");
			break;
		case "nl":
			alert("Vul a.u.b. uw KULeuven Associatie inloggegevens in bij de opties van de extensie. Vernieuw daarna deze pagina om automatisch in te loggen.");
			break;
		}
		// Request background script to open extensions tab.
		opera.extension.postMessage("options");
		return;
	}

	// Redirect if applicable
	redirect(document,settings,locale);

	// Try to login
	try{
		login(document,settings);
	} catch(err){
		// Inform user of wrong credentials
		switch (locale) {
		case "en":
			alert("The Kotnet Login Extension failed to login. Have you changed your password recently? Then update the extensions options please.");
			break;
		case "nl":
			alert("De Kotnet Login Extensie kan u niet inloggen. Hebt u onlangs uw wachtwoord veranderd? Verander dan a.u.b. het wachtwoord in de opties.");
			break;
		}
	}

}

window.addEventListener('DOMContentLoaded', function() {
	// Request locale
	opera.extension.postMessage("locale");
}, false);

opera.extension.onmessage = function(event){
	// Get content of incoming message.
	// Backgroundscript will send locale
	init(event.data);
};