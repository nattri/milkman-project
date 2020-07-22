const db = require("../models");
const Users = db.users;
/**
 * Get list of all users
 */
function getAllUsers(req, res) {
  Users.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all users!"
      });
    });
}

/**
 * Get user by id
 */
function getUserById(req, res) {
  const {
    params: { id }
  } = req;
  Users.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user!"
      });
    });
}

/**
 * Create a new user
 */
function createUser(req, res) {
  const {
    body: { name, location, type }
  } = req;

  // Validate request
  if (!name || !location || !type) {
    res.status(400).send({ message: "Name / location / type are missing!" });
    return;
  }

  // Create a user
  const user = new Users({
    name,
    location,
    type,
    primaryPhone: "dummy primary phone"
  });

  // Save user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user!"
      });
    });
}

/**
 * Update existing user
 */
function updateUser(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const {
    params: { id }
  } = req;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "User updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating user with id=${id}`
      });
    });
}

function deleteUser(req, res) {
  const {
    params: { id }
  } = req;
  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "User deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting user!"
      });
    });
}

function searchUser(req, res) {
  const {
    params: { searchTerm }
  } = req;
  const regexObj = { $regex: new RegExp(searchTerm), $options: "i" };
  var condition = searchTerm
    ? {
        $or: [
          {
            name: regexObj
          },
          {
            location: regexObj
          },
          {
            type: regexObj
          }
        ]
      }
    : {};

  // Save user in the database
  Users.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the user!"
      });
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser
};
