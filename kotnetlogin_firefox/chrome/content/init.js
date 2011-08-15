var UrlObserver = {

  handleEvent : function(event) {
	if(!(event.originalTarget instanceof HTMLDocument)){
		return;
	}
	// only filter applicable urls
	var url = event.originalTarget.location.host;
	if(url.match(/(.*.kuleuven.be|.*.groept.be)/gi) == null){
		return;
	}
	
	var settings = Settings.getSettings();
	
	if(settings.username == ''){
		alert('Please enter your KULeuven Association credentials. Then refresh this page to have them filled in automatically.\nPress OK to proceed ...');
		window.open("chrome://kotnetlogin/content/options.xul", "options", "chrome");
		return;
	}
	
	if(!settings.active){
		return;
	}
	
	try{
		redirect(event.originalTarget,settings);
		login(event.originalTarget,settings);
	} catch(err){
		alert('De Kotnet Login Extensie kan je niet inloggen. Heb je onlangs je wachtwoord veranderd?');
		window.open("chrome://kotnetlogin/content/options.xul", "options", "chrome");
	}
  }
}

var PrefObserver = {
	preferences : Settings.prefInterface,

	startup: function() {
		this.preferences.addObserver('', this, false);
		
	},
	observe: function(subject, topic, data) {
		setIcon();
	}
}

window.addEventListener('load', function(event) {
	PrefObserver.startup();
	getBrowser().addEventListener('load',UrlObserver,true);
	setIcon();
}, true);


function toggle(){
	Settings.toggle();
	setIcon();
}

function setIcon(){
	if(Settings.isActive()){
		document.getElementById('kotnettoggle').src = "chrome://kotnetlogin/content/images/on.png";
	} else {
		document.getElementById('kotnettoggle').src = "chrome://kotnetlogin/content/images/off.png";
	}
	
}