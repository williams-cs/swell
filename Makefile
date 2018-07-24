build: node_modules
	rm -rf dist
	tsc
	
clean:
	rm -rf dist
	rm -rf node_modules

node_modules:
	npm install
    
test: build
	npm test
