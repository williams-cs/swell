build: node_modules
	rm -rf dist
	tsc
	typedoc --out docs --excludeExternals --readme README.md
	touch docs/.nojekyll
	browserify --debug dist/lib/ui/ui.js -o browserui.js

clean:
	rm -rf dist
	rm -rf docs
	rm -rf node_modules
	rm -f browserui.js

node_modules:
	npm install

test: build
	npm test
