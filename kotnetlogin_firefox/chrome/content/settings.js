// Create an object to manipulate logins
var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");

// Settings object, providing functionality to set and get settings
var Settings = {
	prefInterface : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.kotnetlogin.").QueryInterface(Components.interfaces.nsIPrefBranch2),
	passwordManager : Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager),
	host : 'chrome://kotnetlogin',
	realm : 'Automatische Kotnet login',
	
	// get the settings
	getSettings: function(){
		// get prefs (active and institute)
		var active = this.prefInterface.getBoolPref('active');
		var institute = this.prefInterface.getCharPref('institute');
		// defaults
		var username = '';
		var password = '';
		// get saved login (if available)
		var logins = this.passwordManager.findLogins({}, this.host, null, this.realm);
	    if(logins.length > 0) {
	    	username = logins[0].username;
			password = logins[0].password;
	    }
		// return info
		return {username:username,password:password,active:active,institute:institute};
	},
	// save settings: only username and password, institute and active are saved by bindings
	setCredentials : function(username,password){
		// search for existing logins
		var logins = this.passwordManager.findLogins({}, this.host, null, this.realm);
		// delete them
	    for (var i = 0; i < logins.length; i++) {
	    	this.passwordManager.removeLogin(logins[i]);
	    }
		// create a new login
		var loginInfo = new nsLoginInfo(this.host, null, this.realm, username, password, '', '');
		// save it
		this.passwordManager.addLogin(loginInfo);
	},
	toggle: function() {
		// toggle the status of the extension
		this.prefInterface.setBoolPref('active',!this.prefInterface.getBoolPref('active'));
	}
}

// migrate from 1.0.2 (upgrade support for pre 1.0 is dropped)
// TODO: delete after releasing 1.6
try{
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.kotnetlogin.").QueryInterface(Components.interfaces.nsIPrefBranch2);
	if(prefs.getCharPref('inst')){
		var enabled = prefs.getBoolPref('enabled');
		var inst = prefs.getCharPref('inst');
		prefs.deleteBranch('');
		prefs.setBoolPref('active',enabled);
		prefs.setCharPref('institute',inst);
	}
} catch(err){
	// do nothing
}
