// HTTP Methods & Their Corresponding CRUD Operations:
// GET = Read
// POST = Create
// PUT = Update
// DELETE = Delete

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

// H.E.L.P.eR. Functions:
// Why are we using a JSON file? What is this simulating?
// This is simulating what it's like to get data from a database.
const getRecipes = async() => {
    // this accessess all recipes in recipea-lab.js
    const recipeArray = await fs.readFile("../data/recipea-data.json", "utf8");
    // What is the value of getRecipes once this code is called? What data type? Array!
    // console.log(recipes);
    return recipeArray;
}

getRecipes();
const getRecipe = async(id) => {
    // this is what allows us to dig into the array of recipes, and pull a specific one
    const recipeArray = await fs.readFile("../data/recipea-data.json", "utf8");
    // console.log(JSON.parse(data)[id]);
    return JSON.parse(data)[id];
}

const deleteRecipe = async(id) => {
    // this is what allows us to delete a recipe per id, or spot in the stored array
    const recipeArray = await fs.readFile("../data/recipea-data.json", "utf8");
    // What does a .filter(); do? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // What is the difference between JSON.parse() and JSON.stringify()? https://masteringjs.io/tutorials/fundamentals/stringify
    const recipeList = JSON.parse(data).filter((recipe, i) =>  i !== id);
    // const recipes = JSON.parse(data).filter( function (recipe, i) {
    // return i !== id
    //});

    // in regards to short hand, this is the key that Laura reviewed:
    // () => console.log("waddup");

    // function () {
    //     console.log("WAZZUP");
    // }

    // i = i + 1
    // i++

    const jsonRecipes = JSON.stringify(recipes, null, 2);
    // THE TWO IS THERE SIMPLY FOR FORMATTING YOUR JSON DATA FILE. ugh. it's defining how many "spaces" indented inwards to add the new values for json key value pairs
    await fs.writeFile("../data/recipea-data.json", jsonRecipes);
}

// Create a helper function that adds a new Recipe to our list
const createRecipe = async(name, cookingMethod, ingredients) => {
    // Get our recipe list
    const recipeArray = await fs.readFile("../data/recipea-data.json", "utf8");
    // Turn the list from JSON to JS - using JSON.parse()
    const recipeList = JSON.parse(recipeArray);
    // Take the user's input and turn that into a structured object that matches what's in our recipe list already, in other words, the body of the request will match the formatting of your JSON file.
    // Create an object with the request from the Front End
    const newRecipe = {
        name: name,
        cookingMethod: cookingMethod,
        ingredients: ingredients
    }
    // Push that object to our recipe array
    recipeList.push(newRecipe);
    // Turn the array into JSON (this is your raw data)
    const jsonAddRecipe = JSON.stringify(recipeList, null, 2);
    // Update our data file, this is when await kicks in from async, writing to our JSON file
    await fs.writeFile("../data/recipea-data.json", jsonAddRecipe);
}
// Await/Async - event loop and when items are going to be returning from the function

// const saveRecipe = async (newRecipe) => {
//     const recipeArray = await fs.readFile("../data/data.json", "utf8");
//     const recipeList = [...JSON.parse(recipeArray), newRecipe];
//     // ... is a spread operator, it's saying we're going to create another copy of the array and add this new item to it, then return the whole new array
//     const jsonVersion = JSON.stringify(recipeList, null, 2);
//     await fs.writeFile("../data/data.json", jsonVersion, "utf8");
// };

const updateRecipe = async(id, updatedRecipe) => {
    const recipeArray = await fs.readFile("../data/recipea-data.json", "utf8");
    const recipeList = JSON.parse(data).map((recipe, i) => {
        return i === id ? updatedRecipe : recipeList;
    });
}

// Routes

// Why is this app.get()?
// THIS IS AN END POINT
app.get("/find-recipes/:id", async(req, res) => {
    const recipes = await getRecipes();
    res.send(recipes);
});

// Create the post method to handle the user's input
app.post("/create-recipe", async () => {
    await createRecipe(req.body.name, req.body.cookingMethod, req.body.ingredients);
    res.status(201).json("You added a new recipe!");
    // res.json("You added a new recipe!")
});

// create a helper function, create an endpoint and practice through postman

app.put("/update-recipe", async (req, res) => {
    await updateRecipe(req.body.name, req.body.cookingMethod, req.body.ingredients);
    res.status(201).json("You updated an existing recipe!");
    // res.json("You updated an existing recipe!")
});