# Pitchur Perfect
A full stack JavaScript application for singers who want to develop their vocal range

## Technologies Used
<<<<<<< HEAD
-Express.js
-Multer
-JavaScript ES6
-React.js
-Webpack
-Node.js
-PostgreSQL
-HTML5
-CSS3
-Heroku
-AWS S3
-Web Audio API
=======
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
>>>>>>> c2ed526ae9bf9d36af1fb629ac98f7e0cee20ed8

## Live Demo
 Try the application live at https://pitchur-perfect.herokuapp.com/

<<<<<<< HEAD
## Features
-User can create a recording
-User can save a recording
-User can view a recording
-User can like a recording
-User can delete a recording
-User can play the piano
-User can find their pitch
-User can match their pitch with a piano key


### Features to come
-User can view his favorite recordings
-User can sign up
-User can sign in
-User can choose his vocal range
-User can can see his practiced matching stats


### System Requirements
-Node.js 10 or higher
-NPM 6 or higher
-Microphone
-Linux interface Docker or Commander
=======

## Features
### User can create a recording
![Create](https://user-images.githubusercontent.com/50930123/135955860-2809b136-23a4-415a-9988-f7c7ffa15191.gif)

### User can save a recording
![Recording](https://user-images.githubusercontent.com/50930123/135955354-a1ab4e26-e523-4bdc-a248-c58ffd0b6d33.gif)
### User can view a recording
![View Recording](https://user-images.githubusercontent.com/50930123/135955393-299a83cd-1ebd-4e1f-90f0-4a7fd3787818.gif)

### User can like a recording
![Liked an recording](https://user-images.githubusercontent.com/50930123/135955401-251b98bd-76ad-44f9-9dd8-44eb58c6e797.gif)

### User can delete a recording
![delete](https://user-images.githubusercontent.com/50930123/135955404-b16f3e05-68b5-4881-8e2d-90c31dca9107.gif)

### User can play the piano
![Play Piano](https://user-images.githubusercontent.com/50930123/135955412-968c53c3-3098-42ce-b2ae-6d41948c9183.gif)

### User can find their pitch
![Get current pitch](https://user-images.githubusercontent.com/50930123/135955418-a3467f66-fe6a-46c5-8acd-44a5ba11e3d1.gif)

### User can match their pitch with a piano key
![Match Pitch](https://user-images.githubusercontent.com/50930123/135955490-e52f4e0f-104e-4412-8149-d407f3dcbdf0.gif)


### Features to come
* User can view his favorite recordings
* User can sign up
* User can sign in
* User can choose his vocal range
* User can can see his stats for matching keys


### System Requirements
* Node.js 10 or higher
* NPM 6 or higher
* Microphone
* Linux interface (Docker or Commander)
>>>>>>> c2ed526ae9bf9d36af1fb629ac98f7e0cee20ed8



### Getting Started
1. Clone the repository
``` shell
git clone git@github.com:SharjeelSIqbal/pitchur-perfect.git
```
<<<<<<< HEAD
2. Install all dependencies with NPM
=======
2. Install all dependencies with npm
>>>>>>> c2ed526ae9bf9d36af1fb629ac98f7e0cee20ed8
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
