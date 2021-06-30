const Sequelize = require('sequelize');

module.exports = class Schedule extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            my_id:{    //스케줄 만든사람 아이디, 이사람만 스케줄 초대권한있음.
                type:Sequelize.INTEGER,
                allowNull: false,
            },
            schedule_name:{    //스케줄 이름
                type:Sequelize.STRING(20),
                allowNull: false,
            },
            date: {    //스케줄 날짜
                type: Sequelize.DATE,
                allowNull: false,
            },
            place: {    //스케줄 장소
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
        db.Schedule.belongsToMany(db.User, {
            through: 'Schedulemanage',
            onDelete: 'cascade',
        });
    }
}