var UrlObserver = {

  handleEvent : function(event) {
	if(!Settings.getSettings().active){
		return;
	}
	if(!(event.originalTarget instanceof HTMLDocument)){
		return
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
	if(Settings.getSettings().active){
		document.getElementById('kotnettoggle').src = "chrome://kotnetlogin/content/images/on.png";
	} else {
		document.getElementById('kotnettoggle').src = "chrome://kotnetlogin/content/images/off.png";
	}
	
}