const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            image: {
                type: Sequelize.BLOB,
                allowNull: true,
                defaultValue: null,
            }
        },{
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db){
        db.User.belongsToMany(db.User,{
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Friends',
            onDelete: 'cascade',
        });
        db.User.belongsToMany(db.User,{
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Friends',
            onDelete: 'cascade',
        });
        db.User.belongsToMany(db.Schedule, {through: 'Schedulemanage'})
    }
}