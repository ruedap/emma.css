default: build
build:
	sass --style compact --scss emma.scss > emma.css
	vim -s Makefile.vim emma.css
release:
	open https://github.com/ruedap/emma.css/releases
	npm publish
info:
	bower info emma.css
	npm info emma.css
publish: release info
search: info
