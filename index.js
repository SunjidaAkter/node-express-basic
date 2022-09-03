const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const usersRoutes = require("./routes/v1/users.routes.js");

app.use(cors());
app.use(express.json());

app.use("/user", usersRoutes);


app.get("/", (req, res) => {
    res.send("users server is running");
})

app.all("*", (req, res) => {
    res.send("NO route found.");
});

app.listen(port, () => {
    console.log(`users server is running on port ${port}`);
});