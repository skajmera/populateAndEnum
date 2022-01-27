const usersDataAccess = require("../dal/userDal");
const bcrypt = require("bcrypt");

exports.getUser = async (req) => {
  const _id = "61dea0bea5ac9b3282ef104a"//req.body.user_id//"61de801e6c0110302c8c4864";
  const users = await usersDataAccess.findUser({ _id: _id });
  return {
    error: false,
    sucess: true,
    message: "Get user",
    data: users,
  };
};

exports.createUser = async (req) => {
  const { email, password, firstName, lastName, contact,role } = req.body;
  if (!password || !email || !firstName || !lastName || !contact || !role) {
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
    customerId:req.body.cus_id,
    role:req.body.role
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
    data: userData
  };
};

exports.updateUser = async (req, res) => {
  const _id = req.params.id;
  const updateData = {
    _id,
    toUpdate: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  };
  
  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated user successfully",
    data: update,
  };
};