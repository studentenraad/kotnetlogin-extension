//Redirect the browser when needed
//document: the javascript document object of the current page
//settings: a map containing at least the institute
//locale: the current locale string (eg. 'en', 'nl')
function redirect(document,settings,locale){
	// Redirect to login/logout page when visiting netlogin on campusnet or kotnet
	if (document.location.href == 'http://pre-netlogin.kuleuven.be/' || document.location.href == 'https://netlogin.kuleuven.be/' || document.location.href == 'https://netlogin.kuleuven.be/campusnet/' || document.location.href == 'https://netlogin.kuleuven.be/cgi-bin/netlogout.pl' || document.location.href == 'http://netlogin.kuleuven.be/' || document.location.href == 'http://netlogin.kuleuven.be/campusnet/' || document.location.href == 'http://netlogin.kuleuven.be/cgi-bin/netlogout.pl') {
		// Redirect to login page of the institute in the settings
		if (locale == 'nl') {
			document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf2.pl?inst=kuleuven&lang=nl';
		} else {
			document.location.href = 'https://netlogin.kuleuven.be/cgi-bin/wayf2.pl?inst=kuleuven&lang=en';
		}
	}

	// Redirect to login page when visiting toledo
	if (document.location.host == 'toledo.kuleuven.be' || document.location.host == 'www.toledo.kuleuven.be') {
		document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=a';
	} else if (document.location.host == 'toledo.lessius.eu') {
		document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=b';
	}else if (document.location.host == 'toledo.khk.be') {
		document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=c';
	} else if (document.location.host == 'toledo.kahosl.be') {
		document.location.href = 'https://cygnus.cc.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/login.jsp?config=e';
	}

//	// Redirect to login page when visiting LIMO
//	if (document.location.href == 'http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven&fromLogin=true' || document.location.href == 'http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven') {
//	document.location.href = 'https://pds.libis.be/pds?func=load-login&institute=' + settings.institute.toUpperCase() + '&calling_system=primo&url=http://limo.libis.be/primo_library/libweb/action/login.do?targetURL=http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven';
//	}

	// Redirect to login page when visiting toledo via the kuleuven stuiterproxy
	if (document.location.href == 'https://stuiterproxy.kuleuven.be/,DanaInfo=toledo.kuleuven.be,SSO=U+' || document.location.href == 'https://stuiterproxy.kuleuven.be/,DanaInfo=www.toledo.kuleuven.be,SSO=U+') {
		document.location.href = 'https://stuiterproxy.kuleuven.be/webapps/asso-toledo-bb_bb60/nosession/,DanaInfo=cygnus.cc.kuleuven.be,SSL+login.jsp?config=a';
	}

//	// Redirect to login page when visiting LIMO via the kuleuven stuiterproxy
//	if (document.location.href == 'https://stuiterproxy.kuleuven.be/primo_library/libweb/action/,DanaInfo=limo.libis.be+search.do?vid=KULeuven&fromLogin=true' || document.location.href == 'https://stuiterproxy.kuleuven.be/primo_library/libweb/action/,DanaInfo=limo.libis.be+search.do?vid=KULeuven') {
//	document.location.href = 'https://stuiterproxy.kuleuven.be/,DanaInfo=pds.libis.be,SSL+pds?func=load-login&institute=' + settings.institute.toUpperCase() + '&calling_system=primo&url=http://limo.libis.be/primo_library/libweb/action/login.do?targetURL=http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven';
//	}
}