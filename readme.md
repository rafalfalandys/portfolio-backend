# Portfolio App Backend

install: npm i  
run: npm run dev

## Prologue

This project is a backend for my portfolio app built in React. To help myself maintaining the website, I built a CRUD edit panel there and firstly made it talk to Firebase, and after some time I decided to build a dedicated backend.
It has 2 paths - projects and photos. Each path reads, creates, patches and deletes data stored in MongoDB.
All is deployed to heroku.com

Features and stack:
NodeJS | MongoDB | Express | Mongoose |

## Photos:

The photo object contains name, URL, and type (the photo could be a video or link to YouTube too in this case). It also has a thumbnail but not required.

## Projects:

The project object contains basic info about stuff I did as an architect. Titles, descriptions etc. All in 2 languages - PL and EN.

## Afterword

This is the first backend I built, and I have not implemented all the features yet. First in a line is to write it all in typescript (there is not much code, so I want to switch to TS quickly), and then - authentication.
