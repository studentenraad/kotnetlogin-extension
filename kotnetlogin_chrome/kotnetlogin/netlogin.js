loginForm = function(user, pass) {
  forms = document.getElementsByTagName('form');
  theform = forms[1];
  for(x in theform.elements) {
    element = theform.elements[x];
    naam = element.name;
    if (typeof(naam) == 'string') {
      if (naam == 'uid')
	element.value = user;
      if (naam.substring(0,3) == 'pwd')
	element.value = pass;
      if (naam == 'submit')
	element.name = 'btnSubmit';
    }
  }
  theform.submit();
}

pickAssociation = function(institute) {
  source = document.getElementsByTagName('body')[0].innerHTML;
  if (source.indexOf('Indien je nog niet ingelogd bent op het KotNet netwerk, zal deze pagina automatisch getoond worden.') != -1) {
    document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf.pl?inst=' + institute + '&lang=nl&submit=Ga+verder+%2F+Continue';
  }
}

if (document.location.href.indexOf('wayf.pl') == -1) {
  chrome.extension.sendRequest({name: "info"}, function(response) {
    if(response.active != 1)
      return;
    else
      pickAssociation(response.inst);
  });
} else {
  chrome.extension.sendRequest({name: "info"}, function(response) {
    if(response.active != 1)
      return;
    else
      loginForm(response.user, response.pass);
  });
}