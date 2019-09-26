# Purpose :

This is a basic server designed to easily plug a front end app for CRUD test purposes.

This server is based on a JSON db, so you don't have a heavy / complicated installation to do in order to make it work.

# Install : 

## Prerequisite
you'll need npm and git installed on your machine.

I recommand installing nvm ( node version manager ), instructions on github repo.

## Setup
1) clone this repo on your local machine.
2) go inside the folder
3) run ```npm install``` in the terminal
4) when done, run ```npm start``` in the terminal

You have to let the process in the terminal keep running for the API to be available.

The server runs on port 4000

Routes and verbs to use : 

/todos => GET : returns all todos

/todos/:id => GET : return one todo

/todos => POST : create or update a todo depending on id 

/todos/:id => DELETE : delete the todo associated to the id

example with axios calls 

axios.get('http://localhost:4000/todos)

axios.get('http://localhost:4000/todos/uuujzf-zenzfjezf-)

axios.delete('http://localhost:4000/todos/rhgeu-huhuh-uh-hu)

axios.post('http://localhost:4000/todos)

axios.get('http://localhost:4000/todos)