import db from "../models/index.js";
const Session = db.session;
const UserRole = db.userRole;
const Role = db.role;

export const authenticate = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          if (data.length >= 1 && session.expirationDate >= Date.now()) {
            next();
            return;
          } else
            return res.status(401).send({
              message: "Unauthorized! Expired Token, Logout and Login again",
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

isAdmin = async (req, res, next) => {
  let authHeader = req.get("authorization");
  let token = "";
  let roles = [];

  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else
      return res.status(401).send({
        message: "Unauthorized! No authentication header.",
      });
  }

  await Session.findAll({where: {token: token } })
    .then(async (data) => {
      let session = data[0];
      if (session.userId != null) {
        console.log(session.userId);
        await UserRole.findAll({
          where: { userId: session.userId, status: "approved" },
          as: "userrole",
          include: [
            {
              model: Role,
              as: "role",
              required: true,
            },
          ],
        })
          .then((data) => {
            roles = data;
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].role.type == "Admin") {
                next();
                return;
              }
            }
            return res.status(403).send({
              message: "Forbidden! Requires Admin role.",
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send({
              message:
                "There was an error finding roles to authenticate an admin.",
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({
        message: "There was an error find sessions to authenticate an admin.",
      });
    });
};

const auth = {
  authenticate: authenticate,
  isAdmin: isAdmin,
};

module.exports = auth;
