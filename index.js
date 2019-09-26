const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
app.use(express.json()); // for parsing application/json
app.use(bodyParser());
const uuid = require('uuid/v4');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [{ id: uuid(), title: 'lowdb is awesoooome' }] }).write();

const getIdFromRequest = req => req.params.id;

app.get('/', function(req, res) {
	res.send('Hello World!');
});

// get All
app.get('/todos', function(req, res) {
	const todos = db.get('todos').value();

	res.send(todos);
});

// getOne
app.get('/todos/:id', function(req, res) {
	const id = getIdFromRequest(req);
	const result = db
		.get('todos')
		.find({ id })
		.value();

	console.log({ result });
	res.send(result);
});

// create / update a post
app.post('/todos', function(req, res) {
	try {
		const todos = db.get('todos');
		const { body } = req;

		const { id } = body;
		console.log({ id });

		// update
		if (id) {
			console.log('if element');
			todos
				.find({ id })
				.assign(req.body)
				.write();
			res.send(req.body);

			// create
		} else {
			console.log('else');

			const newTodo = { ...req.body, id: uuid() };
			console.log({ newTodo });
			todos.push(newTodo).write();
			res.send(newTodo);
		}

		console.log(body);
	} catch (error) {
		console.log(error);
		res.send('error');
	}
});

// delete a post
app.delete('/todos/:id', function(req, res) {
	try {
		const id = getIdFromRequest(req);

		db.get('todos')
			.remove({ id })
			.write();
		res.send('deleted');
	} catch (error) {
		console.log(error);
	}
});

app.listen(4000, function() {
	console.log('Example app listening on port 3000!');
});
