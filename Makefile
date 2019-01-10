build: node_modules
	rm -rf dist
	tsc
	browserify --debug dist/lib/ui/ui.js -o browserui.js

docs: build
	typedoc --out docs --excludeExternals --readme README.md
	touch docs/.nojekyll

clean:
	rm -rf dist
	rm -rf docs
	rm -rf node_modules

node_modules:
	npm install

test: build
	npm test
