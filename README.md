# Getting Started with Mal Car Admin APP
Mal Car app based on [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/) libraries builded with [Webpack](https://webpack.js.org/)
## Minimum Requirements
-  **[Node js ver. 14+](https://nodejs.org/en/)**
-  **[npm ver. 8+](https://www.npmjs.com/)**
-  **[npx ver. 8+](https://www.npmjs.com/package/npx)**
-  **[yarn ver. 1+](https://www.npmjs.com/package/yarn)**
-  **App build with NPM its DEPRECATED!**
## Available Scripts and Commands
Each command can be run just in the app main directory.
First, install the application dependencies using the command:
#### `yarn` 
Next you can genetate current api types and interfaces by swager using the command:
#### `yarn generate-types`
Or you can genetate app documentation by typescript using the command:
#### `yarn generate-docs`
Now you can run development server on your localhost by command:
#### `yarn start`
Or create production build by command:
#### `yarn buil`

### CORS Windows
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
### CORS MacOS
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
### CORS Linux
google-chrome --disable-web-security
