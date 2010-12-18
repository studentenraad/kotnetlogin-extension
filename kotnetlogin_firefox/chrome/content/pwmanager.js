
var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");

var PwManager = {
  passwordManager : Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager),
  host : 'chrome://kotnetlogin.stijnvermeeren.be',
  realm : 'Automatische Kotnet login',

  save : function(user, password) {
    this.removeAll();
    if (password != '') {
      var loginInfo = new nsLoginInfo(this.host, null, this.realm, user, password, '', '');
      this.passwordManager.addLogin(loginInfo);
    }
    if (PrefManager.prefInterface.getPrefType('uid') != 0) { // pre 0.4
      PrefManager.prefInterface.clearUserPref('uid');
    }
    if (PrefManager.prefInterface.getPrefType('pwd') != 0) { // pre 0.4
      PrefManager.prefInterface.clearUserPref('pwd');
    }
  },
  
  removeAll : function() {
    var logins = this.passwordManager.findLogins({}, this.host, null, this.realm);
    for (var i = 0; i < logins.length; i++) {
      this.passwordManager.removeLogin(logins[i]);
    }
  },

  load : function() {
    var login = this.loadfirst();
    if (login) {
      var key = {user : login.username, password : login.password};
      return key;
    }
    else { // pre 0.4.1
      var logins = this.passwordManager.findLogins({}, 'kotnetlogin@stijnvermeeren.be', '', null);
      if (logins.length > 0) {
        var key = {user : logins[0].username, password : logins[0].password};
        this.save(key.user, key.password);
        for (var i = 0; i < logins.length; i++) {
          this.passwordManager.removeLogin(logins[i]);
        }
        return key;
      }
      else {
        return false;
      }
    }
  },
  
  loadfirst : function() {
    var logins = this.passwordManager.findLogins({}, this.host, null, this.realm);
    if(logins.length > 0) {
      return logins[0];
    }
    else
      return false;
  },
  
  isSet : function() {
    var key = this.load();
    return (key && key.user != "" && key.password != "");
  },
}
