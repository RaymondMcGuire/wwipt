yarn init

yarn add typescript webpack webpack-cli webpack-dev-server
yarn add -D @babel/core @babel/preset-env babel-loader ts-loader tslint prettier tslint-config-prettier tslint-config-standard tslint-plugin-prettier

yarn tsc --init

touch .babelrc
touch tslint.json
touch webpack.config.js

mkdir src dist
touch src/index.ts