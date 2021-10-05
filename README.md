# Pitchur Perfect
A full stack JavaScript application for singers who want to develop their vocal range

## Technologies Used
* Express.js
* Multer
* JavaScript ES6
* React.js
* Webpack
* Node.js
* PostgreSQL
* HTML5
* CSS3
* Heroku
* AWS S3
* Web Audio API

## Live Demo
 Try the application live at https://pitchur-perfect.herokuapp.com/

## Features
### User can create a recording
### User can save a recording
### User can view a recording
### User can like a recording
### User can delete a recording
### User can play the piano
### User can find their pitch
### User can match their pitch with a piano key


### Features to come
* User can view his favorite recordings
* User can sign up
* User can sign in
* User can choose his vocal range
* User can can see his practiced matching stats


### System Requirements
* Node.js 10 or higher
* NPM 6 or higher
* Microphone
* Linux interface Docker or Commander



### Getting Started
1. Clone the repository
``` shell
git clone git@github.com:SharjeelSIqbal/pitchur-perfect.git
```
2. Install all dependencies with NPM
``` shell
npm install
```
3. In the terminal change into the file directory and copy the example env file
```shell
cp .env.example .env
```
4. In your terminal if PostgreSQL isn't currently running, begin running it
``` shell
sudo service postgresql start
```

5. Create a new database for the project
``` shell
createdb pitchurPerfect
```
6. Import the example database to postgreSQL
``` shell
npm run db:import
```
7. In the .env file change the DATABASE_URL to the new database url

8. To view the new database on pgweb, open another terminal window and run
``` shell
pgweb --db=pitchurPerfect
```
9. Start coding!
