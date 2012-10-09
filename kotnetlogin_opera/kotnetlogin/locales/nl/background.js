var active;
window.addEventListener("load", function() {
	opera.extension.onmessage = function(event){
		if (event.data == 'options')
			opera.extension.tabs.create({url:"options.html",focused:true});
		if (event.data == 'locale')
			event.source.postMessage("nl");
	};

	active = widget.preferences.active == "true";
	var ToolbarUIItemProperties = {
			title : "Kotnet Login",
			icon : "icon/icon_18.png",
			badge : {
				display : "none",
				textContent : "uit"
			},
			onclick : function() {
				active = !active;
				widget.preferences.active = active;
				init(button);
			}
	};
	var button = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
	opera.contexts.toolbar.addItem(button);
	init(button);
}, false);

function init(button) {
	// If the extension is active, set the appropriate icon and label
	if (active) {
		button.badge.display = "none";
	} else {
		button.badge.display = "block";
	}
}