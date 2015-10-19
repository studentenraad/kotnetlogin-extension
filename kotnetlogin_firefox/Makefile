ZIP=zip
CHROME=chromium
SIGKEY=$(abspath ../lib/sigkey.pem)
kotnetlogin.xpi: kotnetlogin/chrome/content/login.js kotnetlogin/chrome/content/redirect.js
	cd kotnetlogin&&$(ZIP) -r ../$@ .

kotnetlogin/chrome/content/login.js: ../lib/login.js
	cp $< $@

kotnetlogin/chrome/content/redirect.js: ../lib/redirect.js
	cp $< $@

clean:
	rm -f kotnetlogin.xpi
	rm -f kotnetlogin/chrome/content/login.js
	rm -f kotnetlogin/chrome/content/redirect.js

.PHONY: clean
