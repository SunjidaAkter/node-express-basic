const express = require("express");
const usersControllers = require("../../controllers/users.controller");
const middleware = require("../../middleware/validation");


const router = express.Router();


router
    .route("/all")
    .get(usersControllers.getAllUsers)

router
    .route("/random")
    .get(usersControllers.getARandomUser)

router
    .route("/save")
    .post(middleware.uniqueIdValidation, middleware.userValidation, usersControllers.saveAUser)
router
    .route("/bulk-update")
    .patch(middleware.bodyValidation, usersControllers.updateMultipleUsers)

router
    .route("/update")
    .patch(middleware.uniqueIdValidation, middleware.IdValidation, usersControllers.updateAUser)

router
    .route("/delete/:id")
    .delete(middleware.uniqueParamsIdValidation, middleware.paramsIdValidation, usersControllers.deleteUser)


module.exports = router;