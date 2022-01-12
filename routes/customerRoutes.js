const express = require("express");
const router = express.Router();
const userController = require("../controller/customerController");

router.post("/signup", async (req, res) => {
  const result = await userController.createUser(req);
  return res.send(result);
});

router.get("/getUser", async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

router.post("/login", async (req, res) => {
  const result = await userController.loginUser(req);
  return res.json(result);
});

module.exports = router;
