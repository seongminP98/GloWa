const Sequelize = require('sequelize');

module.exports = class InvSchedule extends Sequelize.Model {
    static init(sequelize){
        return super.init({    //스케줄 초대 테이블
            schedule_id: {    //스케줄 아이디
                type:Sequelize.INTEGER,
                allowNull: false,
            },
            my_id: {    //초대한 사람 아이디
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            friend_id: {    //초대받은 사람 아이디
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },{
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: 'InvSchedule',
            tableName: 'invschedule',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db){}
}
