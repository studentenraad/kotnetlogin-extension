var Bot = {

  warned : false,
  
  isSetCheck : function() {
  	if (!PwManager.isSet()) {
  		alert('Stel je gebruikers-id en paswoord in bij de instellingen van de kotnetlogin extension.');
      this.warned = true;
      return false;
  	}
  	else
  	  return true;
  },


  shibboleth : function(doc) {
    if (this.isSetCheck()) {
  		if (doc.getElementsByTagName('form').length > 0) {
  	    key = PwManager.load();
  			forms = doc.getElementsByTagName('form');
  			theform = forms[0];
  			for(x in theform.elements) {
  				element = theform.elements[x];
  				naam = element.name;
  				if (typeof(naam) == 'string') {
  					if (naam == 'username')
  				  	element.value = key.user;
  					if (naam == 'password')
  		  			element.value = key.password;
  				}
  			}
  			theform.submit();
  		}
    }
  },

  toledo_splash : function(doc) {
    doc.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=a';
  },
  
  toledo : function(doc) {
    if (this.isSetCheck()) {
  		if (doc.getElementsByTagName('form').length > 0) {
  			forms = doc.getElementsByTagName('form');
  			theform = forms[0];
  			instletter = Instelling.getLetter(PrefManager.getInst());
  			if (instletter != '') {
    			for(x in theform.elements) {
    				element = theform.elements[x];
    				naam = element.name;
    				if (typeof(naam) == 'string') {
    					if (naam == 'config') {
    						element.value = instletter;
    				  }
    				}
    			}
    			var parent = doc;
    			while (parent.defaultView.frameElement) {
            parent=parent.defaultView.frameElement.ownerDocument;
          }
          var loginUrl = Instelling.toledoLoginUrl(PrefManager.getInst());
    			if (loginUrl) {
    			  parent.location.href = loginUrl;
    			}
  			  else {
  	        key = PwManager.load();
  			    doc.getElementById('cred').style.display='block';
      			for(x in theform.elements) {
      				element = theform.elements[x];
      				naam = element.name;
      				if (typeof(naam) == 'string') {
      					if (naam == 'user_id')
      						element.value = key.user;
      					if (naam == 'password')
      						element.value = key.password;
      				}
      			}
      		  theform.submit();
      		}
    	  }
  		}
    }
  },
  
  netlogin : function(doc) {
    if (this.isSetCheck()) {
      source = doc.getElementsByTagName('body')[0].innerHTML;
    	if (doc.location.href.indexOf('wayf.pl') != -1) {
    	  key = PwManager.load();
    		forms = doc.getElementsByTagName('form');
    		theform = forms[1];
    		for(x in theform.elements) {
    			element = theform.elements[x];
    			naam = element.name;
    			if (typeof(naam) == 'string') {
    				if (naam == 'uid')
    					element.value = key.user;
    				if (naam.substring(0,3) == 'pwd')
    					element.value = key.password;
    			}
    		}
    		theform.submit();
    	}
    	else if (source.indexOf('Indien je nog niet ingelogd bent op het KotNet netwerk, zal deze pagina automatisch getoond worden.') != -1) {
    		doc.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf.pl?inst='+PrefManager.getInst()+'&lang=nl&submit=Ga+verder+%2F+Continue';
    	}
    }
  },

}
