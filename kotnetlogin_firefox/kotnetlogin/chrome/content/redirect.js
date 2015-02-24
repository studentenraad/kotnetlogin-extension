//Redirect the browser when needed
//document: the javascript document object of the current page
//settings: a map containing at least the institute
//locale: the current locale string (eg. 'en', 'nl')
function redirect(document,settings,locale){
	// Redirect to login/logout page when visiting netlogin on campusnet or kotnet
	if (document.location.href == 'http://pre-netlogin.kuleuven.be/' || document.location.href == 'http://prenetlogin.icts.kuleuven.be/' || document.location.href == 'https://netlogin.kuleuven.be/' || document.location.href == 'https://netlogin.kuleuven.be/campusnet/' || document.location.href == 'https://netlogin.kuleuven.be/cgi-bin/netlogout.pl' || document.location.href == 'http://netlogin.kuleuven.be/' || document.location.href == 'http://netlogin.kuleuven.be/campusnet/' || document.location.href == 'http://netlogin.kuleuven.be/cgi-bin/netlogout.pl') {
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

	// Redirect to KU Leuven LIMO-version
	if (document.location.href == 'http://limo.libis.be/index.html') {
	document.location.href = 'http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven' ;
	}
	
	// Redirect to login page when visiting LIMO

   // if document.location.href.indexOf("https://leuven-primo.hosted.exlibrisgroup.com/pds?func=load-login&institute=KUL") == 0) {
     //  document.location.href = 'https://leuven-primo.hosted.exlibrisgroup.com/pds?func=load-login&term=&institute=NEW_KULEUVEN_CENTRAL_IDP&calling_system=primo&url=http://limo.libis.be:80/primo_library/libweb/action/login.do?targetURL=http%3A%2F%2Flimo%2Elibis%2Ebe%2Fprimo%5Flibrary%2Flibweb%2Faction%2Fsearch%2Edo%3Fdscnt%3D0&' ;
    //}

	
// if (document.location.href == 'https://leuven-primo.hosted.exlibrisgroup.com/pds?func=load-login&institute=KUL[^ ]*') {
// document.location.href = 'https://leuven-primo.hosted.exlibrisgroup.com/pds?func=load-login&term=&institute=NEW_KULEUVEN_CENTRAL_IDP&calling_system=primo&url=http://limo.libis.be:80/primo_library/libweb/action/login.do?targetURL=http%3A%2F%2Flimo%2Elibis%2Ebe%2Fprimo%5Flibrary%2Flibweb%2Faction%2Fsearch%2Edo%3Fdscnt%3D0&' ;
// }



// OLD Redirect to login page when visiting LIMO
// if (document.location.href == 'http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven&fromLogin=true' || document.location.href == 'http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven') {
//	document.location.href = 'https://pds.libis.be/pds?func=load-login&institute=' + settings.institute.toUpperCase() + '&calling_system=primo&url=http://limo.libis.be/primo_library/libweb/action/login.do?targetURL=http://limo.libis.be/primo_library/libweb/action/search.do?vid=KULeuven';
//	}

}