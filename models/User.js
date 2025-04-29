// models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      contact: {
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: true
        }
      },
      department: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      enrollment: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: true
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      user_type: {
        type: DataTypes.ENUM('faculty', 'student'),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'users'
    });
  
    User.associate = models => {
      User.hasMany(models.Event, { foreignKey: 'faculty_id' });
      User.hasMany(models.Request, { foreignKey: 'student_id' });
      User.hasMany(models.AssignedVolunteer, { foreignKey: 'student_id' });
      User.hasMany(models.Query, { foreignKey: 'student_id' });
      User.belongsToMany(models.Skill, {
        through: 'UserSkills',
        foreignKey: 'user_id',
        otherKey: 'skill_id'
      });
    };
  
    return User;
  };