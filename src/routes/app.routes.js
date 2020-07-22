var router = require("express").Router();
var controller = require("../controllers/app.controller");

var routes = app => {
  /**
   * Basic CRUD operations
   */
  // Get list of all customers (including clients & prospects)
  router.get("/", controller.getAllUsers);

  // get user by id
  router.get("/:id", controller.getUserById);

  // create new user
  router.post("/create", controller.createUser);

  // update existing user
  router.put("/:id", controller.updateUser);

  // delete existing user
  router.delete("/:id", controller.deleteUser);

  /**
   * Additional operations
   */
  router.post("/search/:searchTerm", controller.searchUser);

  // attach router
  app.use("/api", router);
};

module.exports = routes;
