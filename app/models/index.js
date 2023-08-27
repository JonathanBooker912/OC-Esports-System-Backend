import { Sequelize } from "sequelize"

import user from "./user.model.js"
import session from "./session.model.js"
import title from "./title.model.js"
import alias from "./alias.model.js"
import team from "./team.model.js"
import emergencyContact from "./emergencyContact.model.js"

const db = {};

db.user = user;
db.session = session;
db.title = title;
db.alias = alias;
db.team = team;
db.emergencyContact = emergencyContact;

db.Sequelize = Sequelize;

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

// foreign key for emergency contact
db.user.hasMany(
  db.emergencyContact,
  { as: "emergencyContact" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);
db.emergencyContact.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

// foreign key for alias
db.user.hasMany(
  db.alias,
  { as: "alias" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);
db.alias.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

// Foreign key for team in alias
db.team.hasMany(
  db.alias,
  { as: "alias" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

// Foreign key for title in team
db.title.hasMany(
  db.team,
  { as: "title" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

export default db;
