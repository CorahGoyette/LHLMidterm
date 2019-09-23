const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("landing_page");
  })
  return router;
}

const bcrypt = require("bcrypt");

// display all the URLS/resources for the current logged in user
router.get("/", (req, res) => {
  let theirUserId = req.session.theirUserId;
  let templateVars = { urls: urlsForUser(theirUserId), user : db[theirUserId]};
  res.render("/home", templateVars);
});

// Route to process login route
router.post("/login", (req, res) => {

  // extract properties from the form body
  let email = req.body.email.trim();
  let password = req.body.password.trim();

  let user = getUserByEmail(email, db);
  if (user === null) {
    res.status(403).send('User not found!');
  } else if (bcrypt.compareSync(password, user.password) === false) {
    res.status(403).send('Invalid password!');
  } else {
    req.session.theirUserId = user.id;
    res.redirect("/home");
  }
});

const getUserByEmail = function(email, db) {
  let result = null;
  for (let id in db){
    let user = database[id];
    if (user.email === email) {
      result = user;
      break;
    }
  }
  return result;
};


// $(document).ready(function() {
//   $("#login").click(function() {
//   let email = $("#email").val().trim();
//   let password = $("#password").val().trim();
//     if( email =='' || password ==''){
//       alert("Please fill all fields!!");
//     } else {
//       $.post("login.ejs",{ email1: email, password1:password},
//       function(data) {
//        if(data=='Invalid Email') {
//         alert(data);
//         } else if(data=='Email or Password is wrong!!'){
//           alert(data);
//         } else if(data=='Successfully Logged in'){
//           $("form")[0].reset();
//           alert(data);
//         } else {
//           alert(data);
//         }
//      });
//     }
//   });
//   });


// $result = db.query("SELECT * FROM users WHERE email='$email' AND password='$password'");
// $data = db.num_rows($result);
//   if($data == 1){
//     alert ("Successfully Logged in");
//   } else {
//     alert ("Email or Password is wrong!");
//   }
