const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Friends = require('./friends');
const ReqFriend = require('./reqFriends');
const Schedule = require('./schedule');
const db={};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
)
db.sequelize = sequelize;
db.User = User;
db.Friends = Friends;
db.ReqFriend = ReqFriend;
db.Schedule = Schedule;

User.init(sequelize);
Friends.init(sequelize);
ReqFriend.init(sequelize);
Schedule.init(sequelize);

User.associate(db);
Friends.associate(db);
ReqFriend.associate(db);
Schedule.associate(db);

module.exports = db;
