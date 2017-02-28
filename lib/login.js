// Mapping between login page identifier and the url
var urls = {
	'netlogin':		/^https:\/\/netlogin\.kuleuven\.be\/cgi-bin\/wayf2\.pl/,
	'kuleuven':		/^https:\/\/idp\.kuleuven\.be\/idp\/profile\/SAML2\/(Redirect|POST)\/SSO\?execution=e[0-9]*s1$/,
	'groept':		/^https:\/\/idp\.groept\.be\/idp\/view\/login\.htm$/,
	'hubrussel':	/^https:\/\/idp\.hubrussel\.be\/idp\/view\/login\.htm$/,
	'katho':		/^https:\/\/idp\.katho\.be\/idp\/view\/login\.htm$/,
	'khbo':			/^https:\/\/idp\.khbo\.be\/idp\/view\/login\.htm$/,
	'khleuven':     /^https:\/\/idp\.khleuven\.be\/idp\/view\/login\.htm$/,
	'khlim':		/^https:\/\/idp\.khlim\.be\/idp\/view\/login\.htm$/,
	'lessius':		/^https:\/\/idp\.lessius\.eu\/idp\/view\/login\.htm$/,
	'wenk':			/^https:\/\/idp\.wenk\.be\/idp\/view\/login\.htm$/,
	'khk':			/^https:\/\/idp\.khk\.be\/idp\/view\/login\.htm$/,
	'kahosl':		/^https:\/\/idp\.kahosl\.be\/idp\/view\/login\.htm$/,
	'madfi2':		/^https:\/\/idp\.madfi2\.be\/idp\/view\/login\.htm$/,
	'kuleuven_via_stuiterproxy':/^https:\/\/stuiterproxy\.kuleuven\.be\/idp\/view\/,DanaInfo=idp\.kuleuven\.be,SSL\+login\.htm$/
};

// Mapping between login page identifier and the method that extracts the form
var forms = {
	'netlogin':		getNetLoginForm,
	'kuleuven':		getKuleuvenIDPForm,
	'groept':		getAssociationIDPForm,
	'hubrussel':	getAssociationIDPForm,
	'katho':		getAssociationIDPForm,
	'khbo':			getAssociationIDPForm,
	'khleuven':		getAssociationIDPForm,
	'khlim':		getAssociationIDPForm,
	'lessius':		getAssociationIDPForm,
	'wenk':			getAssociationIDPForm,
	'khk':			getAssociationIDPForm,
	'kahosl':		getAssociationIDPForm,
	'madfi2':		getAssociationIDPForm,
	'kuleuven_via_stuiterproxy':getKuleuvenIDPForm
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
				break;
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
		data.submit.click();
}

// Get form and input fields from the KULeuven shibboleth page
function getKuleuvenIDPForm(document){
	// return null if password was incorrect
	if(document.getElementById('username.errors')){
		return null;
	}
	var response = {};
	// Get the form and fields by id.
	response.usernameField = document.getElementById('username');
	response.passwordField = document.getElementById('password');
	response.submit = document.getElementsByClassName("form-signin")[0].getElementsByTagName("button")[0];;
	return response;
}

// Get form and input fields from the shibboleth page of a KULeuven Association institute
function getAssociationIDPForm(document){
	// return null if password was incorrect
	if(document.getElementById('username.errors')){
		return null;
	}
	var response = {};
	// Get the form and fields by id.
	response.usernameField = document.getElementById('username');
	response.passwordField = document.getElementById('password');
	response.submit = document.getElementsByClassName('submit')[0];
	return response;
}

// Get form and input fields from the netlogin page
function getNetLoginForm(document){
	var response = {};
	// Get login form
	var form = document.getElementsByTagName('form')[1];
	// extract username and password fields
	for(x in form.elements){
		var field = form.elements[x]; 
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
			response.submit = field;
		}
	}
	return response;
}
