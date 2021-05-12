const Sequelize = require('sequelize');

module.exports = class Friends extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            my_nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            friend_nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },{
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: 'Friends',
            tableName: 'friends',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db){}
}