build:
	rm -rf dist
	tsc

test: build
	npm test