ZIP=zip
CHROME=chromium
SIGKEY=$(abspath ../lib/sigkey.pem)
kotnetlogin.xpi: kotnetlogin/chrome/content/images/kotnetlogin.png kotnetlogin/chrome/content/images/off.png \
	kotnetlogin/chrome/content/images/on.png kotnetlogin/chrome/content/browser.xul kotnetlogin/chrome/content/init.js \
	kotnetlogin/chrome/content/login.js kotnetlogin/chrome/content/options.xul kotnetlogin/chrome/content/redirect.js \
	kotnetlogin/chrome/content/settings.js kotnetlogin/chrome/locale/en/about.dtd kotnetlogin/chrome/locale/en/init.properties \
	kotnetlogin/chrome/locale/en/options.dtd kotnetlogin/chrome/locale/nl/about.dtd kotnetlogin/chrome/locale/nl/init.properties \
	kotnetlogin/chrome/locale/nl/options.dtd kotnetlogin/defaults/preferences/kotnetlogin.js
	$(ZIP) -r $@ $?

kotnetlogin/chrome/content/login.js: ../lib/login.js
	cp $< $@

kotnetlogin/chrome/content/redirect.js: ../lib/redirect.js
	cp $< $@

clean:
	rm -f kotnetlogin.xpi
	rm -f kotnetlogin/chrome/content/login.js
	rm -f kotnetlogin/chrome/content/redirect.js

.PHONY: clean
