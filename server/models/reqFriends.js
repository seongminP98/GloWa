const Sequelize = require('sequelize');

module.exports = class ReqFriends extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            my_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            req_friend_id: {
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