// This observers is checks every page load and invokes the extension if necessary
var UrlObserver = {

	// catch events
  handleEvent : function(event) {
	// This was present in the original code, not sure why it is necessary, but I assume there is a reason for those 3 lines
	if(!(event.originalTarget instanceof HTMLDocument)){
		return;
	}
	
	// only filter applicable urls
	var host = event.originalTarget.location.host;
	if(host.match(/(.*.kuleuven.be|.*.groept.be)/) == null){
		// we are not an a page of the KULeuven Association, exit
		return;
	}
	
	// Load settings
	var settings = Settings.getSettings();
	
	if(settings.username == ''){
		alert('Please enter your KULeuven Association credentials. Then refresh this page to have them filled in automatically.\nPress OK to proceed ...');
		window.open("chrome://kotnetlogin/content/options.xul", "options", "chrome");
		return;
	}
	
	// If the extension is currently disabled, we do nothing
	if(!settings.active){
		return;
	}
	
	// redirect if applicable
	redirect(event.originalTarget,settings);
	
	// Try to login
	try{
		login(event.originalTarget,settings);
	} catch(err){
		// login failed, most probably because of wrong credentials. Inform user and open option pane.
		alert('De Kotnet Login Extensie kan je niet inloggen. Heb je onlangs je wachtwoord veranderd?');
		window.open("chrome://kotnetlogin/content/options.xul", "options", "chrome");
	}
  }
}

// Observer settings to make sure the icon is always in sync with the status of the extension (active or inactive)
var PrefObserver = {
	startup: function() {
		// TODO: add an addObserverMethod to Settings to avoid dependency on field
		// For now this is safe, but maybe in the future this should be changed
		Settings.prefInterface.addObserver('', this, false);
		
	},
	observe: function(subject, topic, data) {
		// a setting has changed, update the icon
		setIcon();
	}
}

// Load the extension for every firefox window
window.addEventListener('load', function(event) {
	PrefObserver.startup();
	getBrowser().addEventListener('load',UrlObserver,true);
	setIcon();
}, true);


// Toogle extension status
function toggle(){
	// toggle status
	Settings.toggle();
	// update icon
	setIcon();
}

// Update the icon in the status bar
function setIcon(){
	// set the icon based on the status
	if(Settings.getSettings().active){
		document.getElementById('kotnettoggle').image = "chrome://kotnetlogin/content/images/on.png";
	} else {
		document.getElementById('kotnettoggle').image = "chrome://kotnetlogin/content/images/off.png";
	}
	
}