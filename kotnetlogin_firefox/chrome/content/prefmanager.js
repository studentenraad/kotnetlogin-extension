var PrefManager = {
  prefInterface : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.kotnetlogin.").QueryInterface(Components.interfaces.nsIPrefBranch2),

  getEnabled : function() {
    return this.prefInterface.getBoolPref('enabled');
  },
  
  getInst : function() {
    return this.prefInterface.getCharPref('inst');
  },

}

// erase some pre 0.4 entries:
var oldPrefInterface = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.kuleuvenlogin.").QueryInterface(Components.interfaces.nsIPrefBranch2);
oldPrefInterface.deleteBranch('');
