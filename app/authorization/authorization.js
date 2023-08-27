import db from "../models/index.js";
const Session = db.session;

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
