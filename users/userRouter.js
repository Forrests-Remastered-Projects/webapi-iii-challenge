const express = "express";
const User = require("./userDb");
const router = express.Router();
const Post = require("../posts/postDb");

router.post("/", (req, res) => {
  const { name } = req.body;
  User.insert({ name })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding user" });
    });
});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "User with id does not exist" });
    }
  });
}
function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }
  if (typeof name !== "string") {
    return res.status(400).json({ error: "name must be a string" });
  }
  next();
}
function validatePost(req, res, next) {
  const { id: user_id } = req.params;
  const { text } = req.body;
  if (!req.body) {
    return res.status(400).json({ error: "Im not sure what to write here" });
  }
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  req.body = { user_id, text };
  next();
}
module.exports = router;
