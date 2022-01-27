require("./mongo");
const morgan = require("morgan");
const express = require("express");
const userRouters = require("./routes/userRoutes");
const customerRouters = require("./routes/customerRoutes");
const app = express();

const PORT = 6379

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouters);
app.use("/customers", customerRouters);

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS WORKING AT PORT ${PORT}`);
});
