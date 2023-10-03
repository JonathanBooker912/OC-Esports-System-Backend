const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.title = require("./title.model.js")(sequelize, Sequelize);
db.alias = require("./alias.model.js")(sequelize, Sequelize);
db.team = require("./team.model.js")(sequelize, Sequelize);
db.emergencyContact = require("./emergencyContact.model.js")(
  sequelize,
  Sequelize
);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.userRole = require("./userrole.model.js")(sequelize, Sequelize);
db.match = require("./match.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for emergency contact
db.user.hasMany(
  db.emergencyContact,
  { as: "emergencyContact" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.emergencyContact.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for alias
db.user.hasMany(
  db.alias,
  { as: "alias" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.alias.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for team in alias
db.team.hasMany(
  db.alias,
  { as: "alias" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for title in team
db.title.hasMany(
  db.team,
  { as: "title" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for user in user role
db.user.hasMany(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
)
db.userRole.belongsTo(
  db.user,
  { as:"user"},
  { foreignKey: {allowNull: false}, onDelete: "CASCADE"}
)

// Foreign key for role in user role
db.role.hasMany(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)

db.userRole.belongsTo(
  db.role,
  { as:"role"},
  { foreignKey: {allowNull: false}, onDelete: "CASCADE"}
)


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

module.exports = db;