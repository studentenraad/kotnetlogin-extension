var UrlObserver = {

  handleEvent : function(event) {
    if (event.originalTarget instanceof HTMLDocument) {
      var inst = PrefManager.getInst();
      var doc = event.originalTarget;
      var href = doc.location.href;
    	if (href.indexOf('//netlogin.kuleuven.be') != -1 && Instelling.hasKotnet(inst)) {
    	  Bot.netlogin(doc);
    	}
    	else if (href.indexOf('https://idp.kuleuven.be/idp/view/login.htm') != -1) {
    	  Bot.shibboleth(doc);
    	}
    	else if (href.indexOf('https://cygnus.cc.kuleuven.be/webapps/portal/tab/_12_1/index.jsp') != -1 && Instelling.hasToledo(inst)) {
        Bot.toledo(doc);
    	}
    	else if (href.indexOf('//toledo.kuleuven.be') != -1) {
        Bot.toledo_splash(doc);
    	}
    }

  },
}


var PrefObserver = {
  preferences : PrefManager.prefInterface,

  startup: function() {
    this.preferences.addObserver('', this, false);
    if (PrefManager.getEnabled()) {
      getBrowser().addEventListener('load',UrlObserver,true);
    }
  },
  
  observe: function(subject, topic, data) {
    if (topic != 'nsPref:changed') {
      return;
    }
    switch(data) {
      case 'enabled':
        getBrowser().removeEventListener('load',UrlObserver,true);
        if (PrefManager.getEnabled()) {
          getBrowser().addEventListener('load',UrlObserver,true);
        }
        else {
        }
        break;
    }
  },
}

window.addEventListener('load', function(event) { PrefObserver.startup(); }, true);
