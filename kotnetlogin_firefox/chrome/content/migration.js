
if (PrefManager.getInst() == 'kubrussel-pers' || PrefManager.getInst() == 'kubrussel-stud') {
  PrefManager.prefInterface.setCharPref('inst','kubrussel');
}


var extensionManager = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager);
if (extensionManager.getInstallLocation("kotnetlogin@pmylemans.blogspot.com")) {
  extensionManager.uninstallItem("kotnetlogin@pmylemans.blogspot.com");  
  window.top.addEventListener('focus',kotnetlogin_shutdownold,true);
}

function kotnetlogin_shutdownold() {
  window.top.removeEventListener('focus',kotnetlogin_shutdownold,true);
  
  window.top.removeEventListener('focus',kotnetlogin_startup,true);
  getBrowser().removeEventListener('load',kotnetlogin_load,true);
}
