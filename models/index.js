// models/index.js
const sequelize = require('../config/database');

const User = require('./User');
const Event = require('./Event');
const Request = require('./Request');
const AssignedVolunteer = require('./AssignedVolunteer');
const Query = require('./Query');
const Skill = require('./Skill');
const UserSkill = require('./UserSkill');

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

module.exports = {
  sequelize,
  User,
  Event,
  Request,
  AssignedVolunteer,
  Query,
  Skill,
  UserSkill
};