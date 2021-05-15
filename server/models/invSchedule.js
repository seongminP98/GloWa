const Sequelize = require('sequelize');

module.exports = class InvSchedule extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            schedule_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            my_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            invite_friend_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },{
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: 'ReqFriends',
            tableName: 'reqFriends',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db){}
}
