shibbolethForm = function(user, pass) {
  if (document.getElementsByTagName('form').length > 0) {
    forms = document.getElementsByTagName('form');
    theform = forms[0];
    for(x in theform.elements) {
      element = theform.elements[x];
      naam = element.name;
      if (typeof(naam) == 'string') {
        if (naam == 'username')
          element.value = user;
        if (naam == 'password')
          element.value = pass;
        if (naam == 'submit')
          element.name = '_submit';
      }
    }
    theform.submit();
  }
}

chrome.extension.sendRequest({name: "info"}, function(response) {
  if (response.active != 1)
    return;
    
  shibbolethForm(response.user, response.pass);
});