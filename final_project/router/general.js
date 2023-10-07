const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author  = req.params.author;
  const bookAuthors = Object.values(books).filter((book)=>
     book["author"] === author
  );

  res.send(JSON.stringify(bookAuthors,null,4));});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title  = req.params.title;
  const bookTitles = Object.values(books).filter((book)=>
     book["title"] === title
  );
  res.send(JSON.stringify(bookTitles,null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn  = req.params.isbn;
  const bookReviews = Object.values(books).filter((book)=>
    book === book["isbn"]).map((book)=>
     book === book["reviews"]
  );
  res.send(JSON.stringify(bookReviews,null,4));
});

module.exports.general = public_users;
