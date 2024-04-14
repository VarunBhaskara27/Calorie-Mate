# Calorie Tracker

[Calorie Tracker - demo video](https://youtu.be/-G478x8Pr-Y)

## OO patterns in code

- Singleton
- MVC
- Proxy
- Template
- Factory
- Iterator

## Tech stack

- **Languages** - Java, JavaScript
- **Frontend** - React, Redux, Bootstrap
- **Backend** - Spring Framework and its components
- **Data Source** - MongoDB Atlas


## Steps to run code

**Prerequisite**
- Have Maven installed and setup
- IntelliJ installed and setup with Amazon Corretto 17.0.6 or a similar OpenJDK version to easily run the code
- Suitable IDE like VSCode or WebStorm installed to run the frontend code

**Run Application**
- Download the code from GitHub.
- Open the `src` folder in intelliJ, setup the correct Java version under Project structure.
- Let IntelliJ download dependencies and build files
- Once the build files are generated, Run the DiscussionBoard file under ```src/main/java/com.caltracker.caltracker/CaltrackerApplication```.
- This will bring up Spring boot, create all the beans, setup connection with the database, create tables if missing, load up all the endpoints and boot up the application in ```localhost:8080```.
- Open the `client` folder in IDE of your choice, run `npm install` to download dependencies from `package.json`
- Run `npm start` to run React, this will boot up the application in `localhost:3000`
- At page `localhost:3000/login` either login using the following credentials to access seeded data `User Name: Running1, Password: Hello123` or create a new account.
