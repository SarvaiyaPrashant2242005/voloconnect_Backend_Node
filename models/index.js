const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import the sequelize instance, not the module

// Initialize models
const UserModel = require('./User');
const EventModel = require('./Event');
const RequestModel = require('./Request');
const AssignedVolunteerModel = require('./AssignedVolunteer');
const QueryModel = require('./Query');
const SkillModel = require('./Skill');
const UserSkillModel = require('./UserSkill');

// Create models using the sequelize instance
const User = UserModel(sequelize, DataTypes);
const Event = EventModel(sequelize, DataTypes);
const Request = RequestModel(sequelize, DataTypes);
const AssignedVolunteer = AssignedVolunteerModel(sequelize, DataTypes);
const Query = QueryModel(sequelize, DataTypes);
const Skill = SkillModel(sequelize, DataTypes);
const UserSkill = UserSkillModel(sequelize, DataTypes);

// Define associations
User.hasMany(Event, { foreignKey: 'faculty_id' });
Event.belongsTo(User, { foreignKey: 'faculty_id' });

User.hasMany(Request, { foreignKey: 'student_id' });
Request.belongsTo(User, { foreignKey: 'student_id' });

Event.hasMany(Request, { foreignKey: 'event_id' });
Request.belongsTo(Event, { foreignKey: 'event_id' });

User.hasMany(AssignedVolunteer, { foreignKey: 'student_id' });
AssignedVolunteer.belongsTo(User, { foreignKey: 'student_id' });

Event.hasMany(AssignedVolunteer, { foreignKey: 'event_id' });
AssignedVolunteer.belongsTo(Event, { foreignKey: 'event_id' });

User.hasMany(AssignedVolunteer, { foreignKey: 'faculty_id' });
AssignedVolunteer.belongsTo(User, { foreignKey: 'faculty_id' });

User.hasMany(Query, { foreignKey: 'student_id' });
Query.belongsTo(User, { foreignKey: 'student_id' });

Event.hasMany(Query, { foreignKey: 'event_id' });
Query.belongsTo(Event, { foreignKey: 'event_id' });

User.belongsToMany(Skill, { through: UserSkill, foreignKey: 'user_id' });
Skill.belongsToMany(User, { through: UserSkill, foreignKey: 'skill_id' });

// Sync function
async function syncDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log('PostgreSQL Synced Successfully');
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
}

// Call it once from your main app (e.g. `server.js`)
module.exports = {
  sequelize,
  User,
  Event,
  Request,
  AssignedVolunteer,
  Query,
  Skill,
  UserSkill,
  syncDB // export this separately
};