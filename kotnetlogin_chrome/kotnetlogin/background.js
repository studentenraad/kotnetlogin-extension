//Start listening for requests for information
chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			// If the request is for information send back the username, password, institute and status
			if (request.name == 'info') 
				sendResponse({username : localStorage.username, password : localStorage.password, institute : localStorage.institute,active:(localStorage.active == 1)});
		});

//Listen for click events on the extension icon	  
chrome.browserAction.onClicked.addListener(function(tab) {
	// switch the status of extension between active and inactive
	localStorage.active = 1 - localStorage.active;
	init();
});

//Initialize the extension
function init() {
	// migrate from earlier versions
	if(localStorage.inst){
		localStorage.institute = localStorage.inst;
		localStorage.inst == null;
		localStorage.username = localStorage.user;
		localStorage.user == null;
		localStorage.password = localStorage.pass;
		localStorage.pass == null;
	}

	// If no institute was chosen, select kuleuven as default
	if (localStorage.institute == null){
		localStorage.institute = "kuleuven";
		localStorage.active = 1;
		chrome.tabs.create({url : chrome.extension.getURL("options.html")});
	}

	// If the extension is not active, set the appropriate icon and label
	if (localStorage.active == 1) {
		chrome.browserAction.setBadgeText({text: ''});
	}
	// If the extension is active, set the appropriate icon and label
	else{
		chrome.browserAction.setBadgeText({text: chrome.i18n.getMessage("badgeText_inactive")});
	}
}

init();