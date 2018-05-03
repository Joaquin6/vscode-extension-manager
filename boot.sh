rm -rf node_modules yarn-error.log npm-debug.log package-lock.json yarn.lock &&
	yarn cache clean &&
	yarn install &&
	yarn test &&
	yarn compile
