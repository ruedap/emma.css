default: build
build:
	sass --style compact --scss emma.scss > emma.css
	vim -s Makefile.vim emma.css
