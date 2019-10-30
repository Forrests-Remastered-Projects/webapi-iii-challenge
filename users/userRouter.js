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
const post = req.body;
Post.insert(post)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Error adding post" });
  });
router.get("/", (req, res) => {});
User.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Error getting users" });
  });
router.get("/:id", (req, res) => {});
res.status(200).json(req.user);
router.get("/:id/posts", (req, res) => {});
const { id } = req.params;
User.getUserPosts(id)
  .then(posts => res.status(200).json(posts))
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Error getting user posts" });
  });
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
