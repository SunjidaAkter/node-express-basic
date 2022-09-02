const express = require("express");
const usersControllers = require("../../controllers/users.controller");
const router = express.Router();


router
    .route("/")
    .get(usersControllers.getAllUsers)
// .post(usersControllers.saveAUser);
router
    .route("/random")
    .get(usersControllers.getARandomUser)
// .post(usersControllers.saveAUser);
router
    .route("/save")
    .post(usersControllers.saveAUser)
// .post(usersControllers.saveAUser);
router
    .route("/delete/:id")
    .delete(usersControllers.deleteUser)
// .post(usersControllers.saveAUser);

// router
// .route("/:id")
// .get(usersControllers.getRandomUser)
// .patch(usersControllers.updateUser)
// // .patch(usersControllers.updateMultipleUsers)
// .delete(usersControllers.deleteUser);

module.exports = router;