const express = require("express");
const usersControllers = require("../../controllers/users.controller");
const router = express.Router();


router
    .route("/")
    .get(usersControllers.getAllUsers)
// .post(usersControllers.saveAUser);

// router
// .route("/:id")
// .get(usersControllers.getRandomUser)
// .patch(usersControllers.updateUser)
// // .patch(usersControllers.updateMultipleUsers)
// .delete(usersControllers.deleteUser);

module.exports = router;