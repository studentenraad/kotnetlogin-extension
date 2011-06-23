// If we get an error, we requested the credentials too many times in a short time frame. This might be caused by invalid credentials.
function showErrorMessage(event){
	// Check if it is an error event
	if(event.name == 'error'){
		// Display a custom message based on the cause of the error.
		if(event.message == 'toomany'){
			alert('Kotnet Login slaagt er niet in je automatisch in te loggen.\nGelieve te controleren of je login-gegevens (nog) correct zijn.');
		} else if (event.message == 'nocredentials'){
			alert('Kotnet Login kan je automatisch inloggen op deze pagina.\nGelieve daarvoor wel eerst je login-gegevens in te vullen in de instellingen.');
		}
	}
}
// Start listening for (error) messages
safari.self.addEventListener("message", showErrorMessage, false);