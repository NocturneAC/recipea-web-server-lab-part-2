// importing the modules needed to run the app
const express = require("express");
// what defines the project as a web server project
// We are requiring express and fs. These are both modules. What is a module? A module is a package of pre-written code. What are the differences between these two modules? One is external to Node and has to be installed. One is built into Node.
// // a module is a set of functions or a set of code that you can import into your project that you don't have to write

const fs = require("fs").promises;
// fs stands for File System

const app = express();

// The app.listen() function is used to bind and listen to the connections on the specified host and port. What is a port?
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// The express.json(); function is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// Why are we using a JSON file? What is this simulating?
// This is simulating what it's like to get data from a database.
const getRecipes = async() => {
    // this accessess all recipes in recipea-lab.js
    const recipes = await fs.readFile("../data/recipea-data.json", "utf8");
    return recipes;
}

const getRecipe = async(id) => {
    // this is what allows us to dig into the array of recipes, and pull a specific one
    const data = await fs.readFile("../data/recipea-data.json", "utf8");
    // What is the value of getRecipes once this code is called? What data type?
    return JSON.parse(data)[id];
}

const deleteRecipe = async(id) => {
    // this is what allows us to delete a recipe per id, or spot in the stored array
    const data = await fs.readFile("../data/recipea-data.json", "utf8");
    // What does a .filter(); do? LINK FOR MDN
    // What is the difference between JSON.parse() and JSON.stringify()? LINK
    const recipes = JSON.parse(data).filter((recipe, i) =>  i !== id);

    const jsonRecipes = JSON.stringify(recipes, null, 2);
    await fs.writeFile("../data/recipea-data.json", jsonRecipes);
}

app.get("/find-recipes", async(req, res) => {
    const recipes = await getRecipes();
    res.send(recipes);
});