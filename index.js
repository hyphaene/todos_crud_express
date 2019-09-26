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
db.defaults({ todos: [] }).write();
const todos = db.get('todos').value();
console.log(todos);
// Add a post

const getIdFromRequest = req => req.params.id;

if (!todos.length) {
	db.get('todos')
		.push({ id: uuid(), title: 'lowdb is awesoooome' })
		.write();
}

app.get('/', function(req, res) {
	res.send('Hello World!');
});
app.get('/test', function(req, res) {
	res.send('Hello World! test');
});
app.get('/todos', function(req, res) {
	const todos = db.get('todos').value();

	res.send(todos);
});
app.get('/todos/:id', function(req, res) {
	const todos = db.get('todos').value();

	console.log({ todos });
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
			db.get('todos')
				.find({ id })
				.assign(req.body)
				.write();
			// create
		} else {
			console.log('else');

			const newTodo = { ...req.body, id: uuid() };

			db.get('todos')
				.push(req.body)
				.write();
		}

		console.log(body);

		res.send('ok');
	} catch (error) {
		console.log(error);
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

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
