const db = require("../models");
const EmergencyContact = db.emergencyContact;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.fName){
        res.status(400).send({
            message: "First name can not be empty",
        })
    } else if (!req.body.lName){
        res.status(400).send({
            message: "Last name can not be empty",
        })
    } else if (!req.body.phoneNumber){
        res.status(400).send({
            message: "Phone number can not be empty",
        })
    } else if (!req.body.emailAddress){
        res.status(400).send({
            message: "Email address can not be empty",
        })
    } else if (!req.body.relationship){
        res.status(400).send({
            message: "Relationship can not be empty",
        })
    }
    // Create Emergency Contact
    const emergencyContact = {
        id: req.body.id,
        fName: req.body.fName,
        lName: req.body.lName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        relationship: req.body.relationship,
    }
    // Save Emergency Contact in the database
    EmergencyContact.create(emergencyContact)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while create Emergency Contact.",
            });
        });
};