all: dist/kotnetlogin_chrome.crx dist/kotnetlogin_chrome_webstore.zip dist/kotnetlogin_firefox.xpi# dist/kotnetlogin_safari.safariextz

clean:
	rm -f dist/*
	make clean -Ckotnetlogin_chrome
	make clean -Ckotnetlogin_firefox
	make clean -Ckotnetlogin_safari

#dist/kotnetlogin_%: kotnetlogin_$(basename %)/dist.$(suffix %)
#	cp kotnetlogin_$(basename $*)/dist$(suffix $*) $@

dist/kotnetlogin_chrome.crx: kotnetlogin_chrome/kotnetlogin.crx
	cp $< $@

dist/kotnetlogin_chrome_webstore.zip: kotnetlogin_chrome/kotnetlogin.zip
	cp $< $@

dist/kotnetlogin_firefox.xpi: kotnetlogin_firefox/kotnetlogin.xpi
	cp $< $@

dist/kotnetlogin_safari.safariextz: kotnetlogin_safari/kotnetlogin.safariextz
	cp $< $@

kotnetlogin%: FORCE
	$(MAKE) -C$(dir $@) $(notdir $@)

FORCE:
.PHONY: all clean
