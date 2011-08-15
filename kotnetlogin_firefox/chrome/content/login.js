// mapping between hostnames and functions to fetch form information
var pages = {
	'https://idp.kuleuven.be/idp/view/login.htm': getKuleuvenForm,
	'https://idp.groept.be/idp/view/login.htm': getGroepTForm,
	'https://netlogin.kuleuven.be/cgi-bin/wayf.pl' : getNetloginForm,
}

// Login
function login(document,settings){
		// iterate over all pages
		var page = false;
		for(var p in pages){
			// If we are on page for which login is implemented
			if(document.location.href.indexOf(p) == 0) {
				// Login
				page = p;
			}
		}
		if(!page){
			return;
		}
		// Extract username and password
		var username = settings.username;
		var password = settings.password;
		// Fetch form and form input fields
		data = pages[page](document);
		// Fill in the fields
		if(data.usernameField){
			// username might be filled in already (e.g. on logout)
			data.usernameField.value = username;
		}
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
function getNetloginForm(document){
	var response = {};
	response.form = document.forms['netlogin'];
	if(!response.form){
		// we are on netlogout
		response.form = document.forms['netlogout'];
	}
	// hack: form.submit() only works when there's no element named 'submit'
	response.form.elements['submit'].name = 'btnSubmit';
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
	}
	return response;
}

