'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Organization.init({
        organizationName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        websiteUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Organization",
    });
    return Organization;
};
//# sourceMappingURL=organization.js.map