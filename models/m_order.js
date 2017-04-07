/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Order = sequelize.define('Order', {
		description : DataTypes.STRING(1024),
		date : {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		pending: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
		classMethods : {
			associate : function(models) {
				Order.belongsTo(models.User)
			}
		}
	});

	return Order;
};