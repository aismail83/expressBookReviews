const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const session = require('express-session')

let users = [];

regd_users.use(express.json());

regd_users.use(session({secret:"fingerpint"}))

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.query.username;
  let password = req.query.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let username = req.session.authorization[username];
  let reviews = req.body.reviews;
  let isbn  = req.params.isbn;
  if (username){
   let bookput = books[isbn]["reviews"];
   bookput.push(username:reviews);
     return res.status(200).send("book review successfully added ");
  }else{
    return res.status(200).send("book review cannnot  added ");
  }

});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    let username = req.session.authorization[username];
    let isbn  = req.params.isbn;
    
    const bookReviews = Object.values(books).filter(  (book)=> book === book["isbn"]);
    if (bookReviews["reviews"].includes(username)){
    let bookReview = bookReviews["reviews"].filter(book => {
        return  book != username});

        books["isbn"]["review"]= bookReview;

       return res.status(200).send("book review successfully added ");
    }else{
      return res.status(403).json({message: "User not authenticated"})
  }
  });
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
