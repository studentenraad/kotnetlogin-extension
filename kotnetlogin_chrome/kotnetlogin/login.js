// Variable to keep the current page
var page = null;

// mapping between hostnames and functions to fetch form information
var pages = {
	'idp.kuleuven.be': getShibbolethForm,
	'idp.groept.be': getShibbolethForm,
	'netlogin.kuleuven.be' : getNetloginForm
}

// iterate over all possible pages
for(var p in pages){
	// If we are on page for which login is implemented
	if(document.location.host == p) {
		// Store the page we're on, so we can use it later to extract the dom elements
		// Request credentials from global page
		chrome.extension.sendRequest({name: "info"}, function(response) {
			if(response == null){
				alert('KotNet Login slaagt er niet in je in te loggen op deze pagina.\nGelieve te controleren of je login-gegevens (nog) correct zijn!');
				return;
			} else if(response.active == 1){
				login(p,response.user,response.pass);
			}
		});
	}
}



// This function is called when the credentials are available
function login(page,username,password){
		// Fetch form and form input fields
		data = pages[page]();
		// Fill in the fields
		data.usernameField.value = username;
		data.passwordField.value = password;
		// Submit the form
		data.form.submit();
}

// Get form and input fields from the shibboleth page
function getShibbolethForm(){
	var response = new Object();
	// Get the form and fields by id.
	response.form = document.getElementById('loginForm');
	response.usernameField = document.getElementById('username');
	response.passwordField = document.getElementById('password');
	// hack: form.submit() only works when there's no element named 'submit'
	response.form.elements['submit'].name = 'btnSubmit';
	return response;
}

// Get form and input fields from the netlogin page
function getNetloginForm(){
	var response = new Object();
	var form = null;
	forms = document.forms['netlogin'];
	// hack: form.submit() only works when there's no element named 'submit'
	response.form.elements['submit'].name = 'btnSubmit';
	// extract username and password fields
	for(field in response.form.elements){
		if(field.type == 'text'){
			// username field
			response.usernameField = field;
		}
		if(field.type == 'password'){
			// password field
			response.passwordField = field;
		}
	}
	return response;
}