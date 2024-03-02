# Portfolio App Backend

install: npm i  
run: npm run dev

## Prologue

This project is a backend for my portfolio app built in React (https://github.com/rafalfalandys/portfolio). To help myself maintaining the website, I built a CRUD edit panel there and firstly made it talk to Firebase, and after some time I decided to build a dedicated backend.
It has 2 paths - projects and photos. Each path reads, creates, patches and deletes data stored in MongoDB.
All is deployed to heroku.com

Features and stack:
NodeJS | MongoDB | Express | Mongoose |

## Endpoints:

For all GET endpoints, available queries are: sort, limit, page, and fields. All MongoDB filters are available

# Photos:

type Photo = {  
name: string;  
thumbnail: string; // default = url  
type: 'img' | 'video' | 'youtube';  
url: string;  
order: number;  
\_id?: string;  
};

GET: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/photos/
Retrieves all photos Data.

POST: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/photos/
Creates new photo.

GET: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/photos/:id
Retrieve single photo data.

PATCH: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/photos/:id
Updates photo.

DELETE: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/photos/:id
Deletes photo.

# Projects:

type Project {  
title: string;  
tytul: string;  
description: string;  
opis: string;  
location: string;  
order: number;  
images: Photo[];  
role: string[];  
tags: string[];  
yearStart: number;  
yearEnd: number;  
id: string;  
\_id: string;  
}

GET: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/projects/
Retrieves all projects Data.

POST: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/projects/
Creates new project.

GET: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/projects/:id
Retrieve single project data.

PATCH: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/projects/:id
Updates project.

DELETE: https://protected-chamber-04342-341ed7575df7.herokuapp.com/api/v1/projects/:id
Deletes project.

# Afterword

This is the first backend I built, and I have not implemented all the features yet. First in a line is to write it all in typescript (there is not much code, so I want to switch to TS quickly), and then - authentication.
