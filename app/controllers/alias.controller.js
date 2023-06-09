const db = require("../models");
const Alias = db.alias;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //Validate request
    if (!req.body.title){
        res.status(400).send({
            message: "Title can't be empty",
        })
    } else if (!req.body.gamerTag){
        res.status(400).send({
            message: "Gamer tag can't be empty",
        })
    }

    //Create alias
    const alias = {
        id: req.body.id,
        title: req.body.title,
        gamerTag: req.body.gamerTag,
    }

    // Save Alias in the database
    Alias.create(alias)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Alias.",
            });
        });

};

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Alias.findAll({ where: condition })
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving aliases"
        })
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Alias.findByPk(id)
    .then((data) => {
        if (data){
            res.send(data);
        }
        else {
            res.status(404).send({
                message: 'Cannot find Alias with id=${id}.',
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error retrieving Alias with id=" + id,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Alias.update(req.body, {
        where: { id: id },
    })
    .then((num) => {
        if (num == 1){
            res.send({
                message: "Alias was updated successfully.",
            })
        }
        else {
            res.send({
                message: 'Cannot update Alias with id=${id}. Maybe Alias was not found or req.body is empty!',
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "There was an error while updating Alias with id=" + id,
        });
    });
};

exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Alias.destroy({
        where: { id: id },
    })
    .then((num) => {
        if (num == 1){
            res.send({
                message: "Alias was deleted successfully",
            })
        }
        else {
            res.send({
                message: "Cannot delete Alias with id=${id}."
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Could not delete Alias with id=" + id,
        });
    });
};

exports.deleteAll = (req, res) => {
    Alias.destroy({
        where: {},
        truncate: false,
    })
    .then((nums) => {
        res.send({ message: '${nums} Aliases were deleted successfully!'})
    })
    .catch((err) => {
        res.status(500).send({
         message: err.message || "An error occurred while removing all Aliases."
        })
    })
}