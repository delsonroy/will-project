# will-project


##########################################################################################################

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) 


# Getting started
- Clone the repository
```
git clone  <https://github.com/prabhjot-singh11/will-project.git>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start for node 

or 


npm run dev for nodemon
```if .env enable
  Navigate to `http://localhost:4000`
or

  Navigate to `http://localhost:3000`


## MOST IMPORTENT
??????????????????????????????????????????????????????????????
add your database link in the app.js
at the the url place





## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |

| **node_modules**         | Contains all  npm dependencies                                                            |
      publid
      public/images
      public/javascript
      public/stylesheeet
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
    
| **src**/app.ts         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    

```


## npm install fails
The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.


packege.json
{
  "name": "will-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "~4.16.1",
    "gitignore": "^0.7.0",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "mongoose": "^6.6.5",
    "morgan": "~1.9.1",
    "nodemon": "^2.0.20"
  }
}
