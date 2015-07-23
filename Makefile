.PHONY: test build coverage codeclimate check-if-built jshint

test:
	./node_modules/.bin/mocha test/* --compilers js:babel/register

coverage:
	istanbul cover ./node_modules/.bin/_mocha -report lcovonly -- -R spec --compilers js:babel/register test/**/*_test.js

codeclimate: coverage
	./node_modules/.bin/codeclimate-test-reporter < ./coverage/lcov.info

build: build-es5 build-es6

build-es6:
	mkdir -p dist/
	./node_modules/.bin/browserify -r ./lib/index.js:flux-crud-store -x immutable -x underscore -x backbone > dist/bundle.js
	cat build/umd-head.js dist/bundle.js build/umd-tail.js > dist/flux_crud.js
	rm dist/bundle.js

build-es5:
	mkdir -p dist/
	./node_modules/.bin/browserify -t babelify -r ./lib/index.js:flux-crud-store -x immutable -x underscore -x backbone > dist/bundle.js
	cat build/umd-head.js dist/bundle.js build/umd-tail.js > dist/flux_crud_es5.js
	rm dist/bundle.js

check-if-built: build
	test `git diff --name-only dist | wc -l` -eq 0

jshint:
	jshint . --exclude-path .jshintignore

jscs:
	jscs .
