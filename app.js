const express = require("express");
const connection = require("./database/db.js");

const PORT = process.env.PORT || 3000;

const app = express();

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create new user
app.post("/create_user", (req, res) => {

  let user = req.body;

  connection.query(`INSERT INTO Persons(ID, Name, Country, Email, Age) VALUES('${user.ID}','${user.Name}','${user.Country}','${user.Email}','${user.Age}')`,
   (err, result) => {
    if (err) {
      console.error(err.message);
    }
  } );

  res.send("Entry displayed successfully");
} );

// show user by id
app.get("/all_users", (req, res) => {
  const id = req.query.id;
  connection.query(`SELECT * FROM Persons WHERE ID = '${id}'`, (err,rows, result) => {
    if(err) throw err;
    res.send(rows);
  } );

} );

// update from user
app.put("/update_user_fields", (req, res) => {
  let updateUserValues = [];
  for(let key in req.body)
  {
    updateUserValues.push(req.body[key]);
  }
  
  console.log(updateUserValues);

  connection.query(`UPDATE Persons SET ${updateUserValues[1] !== '' ? `Name = '${updateUserValues[1]}',` : ''} Email = '${updateUserValues[2]}', 
    Country = '${updateUserValues[3]}', Age = '${updateUserValues[4]}' WHERE ID = '${updateUserValues[0]}'`, 
     (err) => {
        
    if(err) {
      res.send("Error encountered while displaying");
      return  console.error(err.message);
    }       
    res.send("Entry updated successfully");
    console.log("Entry updated successfully");
  } ); 

} );

// delete user
app.delete("/delete", (req,res) => {
  const id = req.query.id;
  connection.query(`DELETE FROM Persons WHERE ID = '${id}'`, (err) => {
    if(err) {
      res.send("Error encountered while deleting");
      return console.error(err.message);
    }
    res.send("Entry deleted");  
  } );

  console.log("Entry deleted");
} );

app.listen(PORT, () => console.log(`server has been started on port ${PORT}`));
