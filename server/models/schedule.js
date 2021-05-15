const Sequelize = require('sequelize');

module.exports = class Schedule extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            my_id:{
                type:Sequelize.INTEGER,
                allowNull: false,
            },
            name:{
                type:Sequelize.STRING(20),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            place: {
                type: Sequelize.TEXT,
                allowNull: true,
            }
        },{
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: 'Schedule',
            tableName: 'schedule',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db){
        db.Schedule.belongsToMany(db.User, {through: 'Schedulemanage'});
    }
}