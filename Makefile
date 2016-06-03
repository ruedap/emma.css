default: build
build:
	sass --style compact --scss emma.scss > emma.css
	vim -s Makefile.vim emma.css
publish:
	open https://github.com/ruedap/emma.css/releases
	npm publish
