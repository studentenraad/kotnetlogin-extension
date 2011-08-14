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
	
	
	if(!Settings.isActive()){
		return;
	}
	
	redirect(event.originalTarget);
	login(event.originalTarget);
	
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