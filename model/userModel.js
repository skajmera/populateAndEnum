const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "customerPopulate",
    required:true
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role : {
    type : String,
    enum : {ADMIN : "Admin",VENDOR : "Vendor"}
}
});

const User = mongoose.model("UserPopulate", UserSchema);
module.exports = User;
