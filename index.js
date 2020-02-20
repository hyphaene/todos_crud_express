const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const cors = require('cors');
const FileSync = require('lowdb/adapters/FileSync');

app.use(express.json());
app.use(bodyParser());
app.use(cors());

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

// create a post
app.post('/todos', function(req, res) {
	try {
		const todos = db.get('todos');
		const { body } = req;

		const { id } = body;
		console.log({ id });

		// update
		if (id) {
			console.log('id should not be provided, it is an creation path, not a update one.');

			// create
		} else {
			console.log('else');

			const newTodo = { ...req.body, id: uuid() };
			console.log({ newTodo });
			todos.push(newTodo).write();
			res.send(newTodo);
		}
	} catch (error) {
		console.log(error);
		res.send('error');
	}
});

// update a post

app.put('/todos/:id', function(req, res) {
	try {
		const todos = db.get('todos');
		const { body } = req;

		const { id } = body;
		console.log({ id });

		// update
		if (id) {
			todos
				.find({ id })
				.assign(req.body)
				.write();
			res.send(req.body);
		} else {
			console.log('id should not be provided, it is an update path, not a creation one.');
		}
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

const PORT = 5000;

app.listen(PORT, function() {
	console.log(`Example app listening on port ${PORT}`);
});
