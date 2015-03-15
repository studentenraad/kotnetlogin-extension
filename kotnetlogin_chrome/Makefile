ZIP=zip
CHROME=chromium
SIGKEY=$(abspath ../lib/sigkey.pem)

DEPS=kotnetlogin/background.js kotnetlogin/init.js kotnetlogin/login.js \
	kotnetlogin/manifest.json kotnetlogin/options.html kotnetlogin/options.js kotnetlogin/redirect.js \
	kotnetlogin/icon/icon_128.png kotnetlogin/icon/icon_32.png kotnetlogin/icon/icon_48.png \
	kotnetlogin/_locales/en/messages.json kotnetlogin/_locales/nl/messages.json

kotnetlogin.crx: $(DEPS)
	$(CHROME) --pack-extension=kotnetlogin --pack-extension-key=$(SIGKEY)

kotnetlogin.zip: $(DEPS)
	$(ZIP) -r $@ $?

kotnetlogin/login.js: ../lib/login.js
	cp $< $@
kotnetlogin/redirect.js: ../lib/redirect.js
	cp $< $@

clean:
	rm -f kotnetlogin.crx
	rm -f kotnetlogin.zip
	rm -f kotnetlogin/login.js
	rm -f kotnetlogin/redirect.js

.PHONY: clean
