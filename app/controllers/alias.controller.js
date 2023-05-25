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
