const express = require("express");
const usersControllers = require("../../controllers/users.controller");
const middleware = require("../../middleware/validation");


const router = express.Router();


router
    .route("/all")
    /*
        @api {get} "/user/all" 
        @apiDescription Get all users from DB
        @apiPermission no need
        @apiHeader no need
        @apiParam  no need
        @apiQuery  optional  ?limit=
        @apiSuccess {data: [{}], error:{status: false, message: ""}}
        @apiError (server error 500)  internal server error  
        @sample Request: http://localhost:5000/user/all?limit=5
    */
    .get(usersControllers.getAllUsers)

router
    .route("/random")
    /*
       @api {get} "/user/random" 
       @apiDescription Get a random user from DB
       @apiPermission no need
       @apiHeader no need
       @apiParam  no need
       @apiParam  no need
       @apiSuccess {data: {}, error:{status: false, message: ""}}
       @apiError (server error 500)  internal server error  
       @sample Request: http://localhost:5000/user/random  
   */
    .get(usersControllers.getARandomUser)

router
    .route("/save")
    /*
        @api {post} "/user/save" 
        @apiDescription save a new user to DB
        @apiPermission no need
        @apiHeader no need
        @apiParam  no need
        @apiQuery  no need
        @apiSuccess {data: {}, error:{status: false, message: ""}}
        @apiError (server error 500)  internal server error  
        @sample Request: http://localhost:5000/user/save     
    */
    .post(middleware.uniqueIdValidation, middleware.userValidation, usersControllers.saveAUser)

router
    .route("/update")
    /*
            @api {patch} "/user/update" 
            @apiDescription update an existing user to DB
            @apiPermission no need
            @apiHeader no need
            @apiParam  no need
            @apiQuery  no need
            @apiSuccess {data: {}, error:{status: false, message: ""}}
            @apiError (server error 500)  internal server error  
            @sample Request: http://localhost:5000/user/update     body: { "id":"12","gender":"male", "name": "Dccu Makaivaer", "contact":"1564564545", "address":"Kulas Light, Gwenborough", "photoUrl": "https://media.marketrealist.com/brand-img/Ik1D_rqGf/0x0/newprofile-pic-1-1652281674003.jpg"}  
        */
    .patch(middleware.uniqueIdValidation, middleware.IdValidation, usersControllers.updateAUser)

router
    .route("/bulk-update")
    /*
        @api {patch} "/user/bulk-update" 
        @apiDescription update multiple existing users to DB
        @apiPermission no need
        @apiHeader no need
        @apiParam  no need
        @apiQuery  no need
        @apiSuccess {data: [], error:{status: false, message: ""}}
        @apiError (server error 500)  internal server error  
        @sample Request: http://localhost:5000/user/bulk-update     
    */
    .patch(middleware.bodyValidation, usersControllers.updateMultipleUsers)
router
    .route("/delete/:id")
    /*
        @api {patch} "/user/delete" 
        @apiDescription delete an existing users to DB
        @apiPermission no need
        @apiHeader no need
        @apiParam  no need
        @apiQuery  no need
        @apiSuccess {data: [], error:{status: false, message: ""}}
        @apiError (server error 500)  internal server error  
        @sample Request: http://localhost:5000/user/delete     
    */
    .delete(middleware.uniqueParamsIdValidation, middleware.paramsIdValidation, usersControllers.deleteUser)


module.exports = router;