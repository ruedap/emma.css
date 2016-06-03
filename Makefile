build:
	sass --style compact --scss emma.scss > emma.css
	vim -c 'g/^$/d' -c 'wq' emma.css
