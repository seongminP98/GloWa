const Sequelize = require('sequelize');

module.exports = class Favorites extends Sequelize.Model {
    static init(sequelize){
        return super.init({    //음식점 즐겨찾기 테이블
            my_id: {    //내 아이디
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            restaurant: {    //음식점 이름
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            address: {    //음식점 주소
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            kind:{         //종류(한식,중식,일식,간식 등)
                type: Sequelize.STRING(10),
                
            }
        },{
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: 'Favorites',
            tableName: 'favorites',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db){}
}