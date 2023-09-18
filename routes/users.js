import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs"; // Import the fs module

const router = express.Router();

let users = []; // Initialize the users array

// Load data from "user.json" file on server start
fs.readFile("user.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading user.json:", err);
    return;
  }

  users = JSON.parse(data); // Parse the JSON data and store it in the users array
});

router.get("/", (req, res) => {
  console.log(users);
  res.send(users);
});

// Update "user.json" with the new data

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  // Update "user.json" with the updated data
  fs.writeFile("user.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing user.json:", err);
      return res.status(500).send("Error deleting user data.");
    }

    res.send(`User with the id ${id} deleted from the database.`);
  });
});

export default router;
