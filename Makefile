all: test

# Standalone browser build

standalone: components
	@./node_modules/.bin/component-build -s loupe -o .
	@mv build.js loupe.js

# Dev build

build: components lib/*
	@./node_modules/.bin/component-build --dev

# Clean

clean: clean-node clean-browser clean-components clean-cov

clean-node:
	@rm -rf node_modules

clean-browser:
	@rm -f loupe.js

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf coverage

# CI

ci:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_hydro --report lcovonly -- \
		&& cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Support

components: component.json
	@./node_modules/.bin/component-install --dev

node_modules: package.json
	@npm install

# Install node modules and components

install: node_modules components

.PHONY: all test standalone
