var username;
var password;
var institute;
var saveButton;
var resetButton;

//Load settings from localStorage and fill them in in the form
function init() {
	username = document.getElementById("username");
	password = document.getElementById("password");
	institute = document.getElementById("institute");
	saveButton = document.getElementById("save-button");
	resetButton = document.getElementById("reset-button");

	username.value  = localStorage.username || "";
	password.value  = localStorage.password || "";
	institute.value = localStorage.institute || "kuleuven";
	markClean();
}

//Save settings in localStorage
function save() {
	var wasNull = (localStorage.active == null);
	localStorage.username = username.value;
	localStorage.password = password.value;
	localStorage.institute = institute.value;
	if (wasNull) localStorage.active = 1;
	document.getElementById('success').style.display = 'block';
	markClean();
}

function cancel() {
	window.close();
}

function markDirty() {
	saveButton.disabled = false;
}

function markClean() {
	saveButton.disabled = true;
}

//Add event listeners once the DOM has fully loaded by listening for the
//`DOMContentLoaded` event on the document, and adding your listeners to
//specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
	document.title = 'Kotnet Login - '+chrome.i18n.getMessage('options_options');
	var objects = document.getElementsByTagName('*'), i;
	for(i = 0; i < objects.length; i++) {
		if (objects[i].dataset && objects[i].dataset.message) {
			objects[i].innerHTML = chrome.i18n.getMessage(objects[i].dataset.message);
		}
	}

	init();

	username.addEventListener('input', markDirty);
	password.addEventListener('input', markDirty);
	institute.addEventListener('change', markDirty);
	saveButton.addEventListener('click', save);
	resetButton.addEventListener('click', cancel);
});
