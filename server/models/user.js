const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
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
    static associations(db){}
}