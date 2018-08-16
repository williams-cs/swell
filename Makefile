build: node_modules
	rm -rf dist
	tsc
	typedoc --out docs
	
clean:
	rm -rf dist
	rm -rf node_modules

node_modules:
	npm install
    
test: build
	npm test
