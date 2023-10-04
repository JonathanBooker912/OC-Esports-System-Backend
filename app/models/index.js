import { Sequelize } from "sequelize";

import user from "./user.model.js";
import session from "./session.model.js";
import title from "./title.model.js";
import alias from "./alias.model.js";
import team from "./team.model.js";
import emergencyContact from "./emergencyContact.model.js";
import role from "./role.model.js";
import userRole from "./userrole.model.js";
import match from "./match.model.js";

const db = {};

db.user = user;
db.session = session;
db.title = title;
db.alias = alias;
db.team = team;
db.emergencyContact = emergencyContact;
db.role = role;
db.userRole = userRole;
db.match = match;

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

// Foreign key for user in user role
db.user.hasMany(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);
db.userRole.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

// Foreign key for role in user role
db.role.hasMany(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);

db.userRole.belongsTo(
  db.role,
  { as: "role" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" },
);


// Match relationships
db.team.hasMany(
  db.match,
  { as:"match"},
  { foreignKey: {allowNull: false}, onDelete:"CASCADE"}
)
db.match.belongsTo(
  db.team,
  { as:"team"},
  {foreignKey: {allowNull: false}, onDelete:"CASCADE"}
)

export default db;
