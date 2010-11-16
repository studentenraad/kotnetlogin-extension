loginForm = function(user, pass) {
  theform = document.getElementById('login');
  document.getElementById('username').value = user;
  document.getElementById('password').value = pass;
  theform.submit();
}

chrome.extension.sendRequest({name: "info"}, function(response) {
  if(response.active != 1)
    return;
  else
    loginForm(response.user, response.pass);
});
