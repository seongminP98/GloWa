const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');

const ReqFriend = require('./reqFriends');
const Schedule = require('./schedule');
const InvSchedule = require('./invSchedule');
const Favorites = require('./favorites');

const db={};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
)
db.sequelize = sequelize;
db.User = User;
db.ReqFriend = ReqFriend;
db.Schedule = Schedule;
db.InvSchedule = InvSchedule;
db.Favorites = Favorites;

User.init(sequelize);
ReqFriend.init(sequelize);
Schedule.init(sequelize);
InvSchedule.init(sequelize);
Favorites.init(sequelize);

User.associate(db);
ReqFriend.associate(db);
Schedule.associate(db);
InvSchedule.associate(db);
Favorites.associate(db);

module.exports = db;
