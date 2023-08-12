const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!",
    });
    return;
  } //else if (!req.body.lName) {
  //   res.status(400).send({
  //     message: "Last name can not be empty!",
  //   });
  // } else if (!req.body.phoneNumber) {
  //   res.status(400).send({
  //     message: "Phone number can not be empty!",
  //   });
  // } else if (!req.body.email) {
  //   res.status(400).send({
  //     message: "Email can not be empty!",
  //   });
  // } else if (!req.body.address) {
  //   res.status(400).send({
  //     message: "Address can not be empty!",
  //   });
  // } /*else if (!req.body.shirtSize) {
  //   res.status(400).send({
  //     message: "Shirt size can not be empty!",
  //   })
  // } else if (!req.body.pantSize) {
  //   res.status(400).send({
  //     message: "Pant size can not be empty!",
  //   })
  // }else if (!req.body.outsidePC) {
  //   res.status(400).send({
  //     message: "Outside PC can not be empty!",
  //   })
  // }else if (!req.body.fullVacc) {
  //   res.status(400).send({
  //     message: "Full Vacc can not be empty!",
  //   })
  // }else if (!req.body.classification) {
  //   res.status(400).send({
  //     message: "Classification can not be empty!",
  //   })
  // }else if (!req.body.expectedGradDate) {
  //   res.status(400).send({
  //     message: "Expected grad date can not be empty!",
  //   })
  // }else if (!req.body.activePlayer) {
  //   res.status(400).send({
  //     message: "Active player can not be empty!",
  //   })
  // }else if (!req.body.role) {
  //   res.status(400).send({
  //     message: "Role can not be empty!",
  //   })
  // }*/

  // Create a User
  const user = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    shirtSize: req.body.shirtSize,
    pantSize: req.body.pantSize,
    outsidePC: req.body.outsidePC,
    fullVacc: req.body.fullVacc,
    classification: req.body.classification,
    expectedGradDate: req.body.expectedGradDate,
    activePlayer: req.body.activePlayer,
    dateSignedAgreement: req.body.dateSignedAgreement,
    role: "user",
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  const filter = req.query.filter;
  const offset = req.query.pageSize * (req.query.page - 1) || 0;
  const limit = Number(req.query.pageSize) || 10000000;

  if (filter == undefined || filter == "" || filter == null) {
    var condition = id
      ? { id: { [Op.like]: `%${id}%` } }
      : email
      ? { email: { [Op.like]: `%${email}%` } }
      : null;
    User.findAndCountAll({
      where: condition,
      offset: offset,
      limit: limit,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  } else {
    var condition = {
      [Op.or]: [
        { id: { [Op.like]: "%" + filter + "%" } },
        { fName: { [Op.like]: "%" + filter + "%" } },
        { lName: { [Op.like]: "%" + filter + "%" } },
      ],
    };
    User.findAndCountAll({
      where: {
        [Op.or]: {
          id: { [Op.like]: "%" + filter + "%" },
          fName: { [Op.like]: "%" + filter + "%" },
          lName: { [Op.like]: "%" + filter + "%" },
        },
      },
      offset: offset,
      limit: limit,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  }
};

exports.findFor = (req, res) => {
  const filter = req.query.filter;
  const offset = req.query.pageSize * req.query.page;
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  /* If the request conatains a field for role, remove it to prevent access control violation */
  if (req.body.role != null) {
    delete req.body.role;
  }

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};

// Delete all People from the database.
exports.getClassifications = (req, res) => {
  res.send(User.getAttributes().classification.values);
};
