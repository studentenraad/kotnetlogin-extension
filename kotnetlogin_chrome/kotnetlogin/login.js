// Mapping between login page identifier and the url
var urls = {
	'kuleuven':/^https:\/\/idp\.kuleuven\.be\/idp\/view\/login\.htm$/,
	'groept':/^https:\/\/idp\.groept\.be\/idp\/view\/login\.htm$/,
	'netlogin':/^https:\/\/netlogin\.kuleuven\.be\/cgi-bin\/wayf2\.pl/
};

// Mapping between login page identifier and the method that extracts the form
var forms = {
	'kuleuven':getKuleuvenForm,
	'groept':getGroepTForm,
	'netlogin':getNetLoginForm
};

// Login
// document: javascript document element
// settings: a map containing at least username and password
function login(document,settings){
		// variable to remember which login page we're on
		var page = false;
		// iterate over all known login pages
		for(var id in urls){
			// If we are on page for which login is implemented
			if(document.location.href.match(urls[id])) {
				// Login
				page = id;
			}
		}
		// If page is still false, we're not on a login page. Exit.
		if(!page){
			return;
		}
		
		// Extract username and password
		var username = settings.username;
		var password = settings.password;
		// Fetch form and form input fields using the forms map
		data = forms[page](document);
		// Fill in the fields
		if(data.usernameField){
			// username might be filled in already (e.g. on logout)
			// we only fill it in if it is available
			data.usernameField.value = username;
		}
		// Fill in the password
		data.passwordField.value = password;
		// Submit the form
		data.form.submit();
}

// Get form and input fields from the KULeuven shibboleth page
function getKuleuvenForm(document){
	// return null if password was incorrect
	if(document.getElementById('username.errors')){
		return null;
	}
	var response = {};
	// Get the form and fields by id.
	response.form = document.getElementById('loginForm');
	response.usernameField = document.getElementById('username');
	response.passwordField = document.getElementById('password');
	// hack: form.submit() only works when there's no element named 'submit'
	response.form.elements['submit'].name = 'btnSubmit';
	return response;
}

// Get form and input fields from the GroepT shibboleth page
function getGroepTForm(document){
	// return null if password was incorrect
	if(document.getElementById('username.errors')){
		return null;
	}
	var response = {};
	// Get the form and fields by id.
	response.form = document.getElementById('login');
	response.usernameField = document.getElementById('username');
	response.passwordField = document.getElementById('password');
	return response;
}

// Get form and input fields from the netlogin page
function getNetLoginForm(document){
	var response = {};
	// Get login form
	response.form = document.getElementsByTagName('form')[1];
	// extract username and password fields
	for(x in response.form.elements){
		var field = response.form.elements[x]; 
		if(field.type == 'text'){
			// username field
			response.usernameField = field;
		}
		if(field.type == 'password'){
			// password field
			response.passwordField = field;
		}
		if(field.name == 'submit'){
			// hack: form.submit() only works when there's no element named 'submit'
			field.name = 'btnSubmit';
		}
	}
	return response;
}