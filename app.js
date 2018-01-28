const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Genre = require('./models/genre');
const Book = require('./models/book');

const port = 8080;

// setting up body parser for forms 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':false}));

mongoose.connect('mongodb://localhost/bookstore_node_api');
const db = mongoose.connection;




app.get('/',function (req,res) {
	res.send('Please use /api/books to hit our api or /api/genres');
	res.end();
});

// get all genres 

app.get('/api/genres',function (req,res) {
	
	Genre.getGenres(function (err,genres) {
		
		if(err){
			throw err;
		}
		res.json(genres);
	});

});

// add genre

app.post('/api/add_genre',function (req,res) {
	var genre = req.body;
	Genre.addGenre(genre,function (err,genre) {
		if(err){
			throw err; 
		}
		res.json(genre);
	});

});

// update genre

app.put('/api/update_genre/:_id',function (req,res) {
	let id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function (err,genre) {
		if(err){
			throw err; 
		}
		res.json(genre);
	});

});

// delete genre
app.delete('/api/delete_genre/:_id',function (req,res) {
	let id = req.params._id;
	var genre = req.body;
	Genre.deleteGenre(id, function (err,genre) {
		if(err){
			throw err; 
		}
		res.json(genre);
	});

});

// get all books

app.get('/api/books',function (req,res) {
	
	Book.getBooks(function (err,books) {
		
		if(err){
			throw err;
		}
		res.json(books);
	});

});

// get book by id

app.get('/api/books/:_id',function (req,res) {
	
	Book.getBookById(req.params._id,function (err,book) {
		
		if(err){
			throw err;
		}
		res.json(book);
	});

});

// add book
app.post('/api/add_book',function (req,res) {
	var book = req.body;
	Book.addBook(book,function (err,book) {
		if(err){
			throw err; 
		}
		res.json(book); 
	});

});

// update book
app.put('/api/update_book/:_id',function (req,res) {
	let id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function (err,book) {
		if(err){
			throw err; 
		}
		res.json(book);
	});

});

// delete book
app.delete('/api/delete_book/:_id',function (req,res) {
	let id = req.params._id;
	var book = req.body;
	Book.deleteBook(id, function (err,book) {
		if(err){
			throw err; 
		}
		res.json(book);
	});

});

app.listen(port,function () {
	console.log('Yoooo bayyy');
});