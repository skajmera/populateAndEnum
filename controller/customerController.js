const usersDataAccess = require("../dal/customerDal");
const bcrypt = require("bcrypt");

exports.getUser = async (req) => {
  const _id = req.body.cus_id//"61de7b7a0f47e63c7f62a90b"
  const users = await usersDataAccess.findUser({ _id: _id })
  return {
    error: false,
    sucess: true,
    message: "Get user",
    data: users,
  };
};

exports.createUser = async (req) => {
  const { email, password, firstName, lastName, contact } = req.body;
  if (!password || !email || !firstName || !lastName || !contact) {
    return (401, "Bad request");
  }
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const data = {
    profileImage: "uploads/1633780506772defaultImage.jpg",
    isVerified: false,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    email: req.body.email,
    password: passwordHash,
  };
  const storedUser = await usersDataAccess.storeUser(data);
  return {
    error: false,
    sucess: true,
    message: "user created successfully",
    data: storedUser,
  };
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return (
      401,
      "Either username or password is missing in the request."
    );
  }
  const userData = await usersDataAccess.findUserByUsername({
    email: req.body.email,
  });
  if (!userData) {
    return (404, "email not found in the database.");
  }
  const match = bcrypt.compareSync(req.body.password, userData.password);
  if (!match) {
    return (403, "Invalid password");
  }
  return {
    error: false,
    sucess: true,
    message: "login user successfully",
    data: userData,
  };
};
