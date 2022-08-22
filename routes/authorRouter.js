const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");

//get all authors
router.get("/", async (req, res) => {
  let searchOption = {};
  //console.log(req.query);
  if (req.query.name != null && req.query.name !== "") {
    searchOption.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOption);
    // console.log("list authors", authors);
    res.render("authors/index", {
      authors: authors,
      searchOption: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});
//new author route
router.get("/new", async (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});
//update an author
router.put("/byname", async (req, res) => {});
//delete an author
router.delete("/byname", async (req, res) => {});

module.exports = router;
