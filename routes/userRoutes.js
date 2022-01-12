const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {authRole,authpermission,} = require('../middleware')

router.post("/signup", async (req, res) => {
  const result = await userController.createUser(req);
  return res.send(result);
});

router.get("/getUser",authpermission("Admin") ,async (request, response) => {
  const result = await userController.getUser(request);
  return response.json(result);
});

router.post("/login", async (req, res) => {
  const result = await userController.loginUser(req);
  return res.json(result);
});

module.exports = router;
