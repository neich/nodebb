/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Order = sequelize.define('Order', {
		description : DataTypes.STRING(1024),
		date : DataTypes.DATE,
		pending: DataTypes.INTEGER
	}, {
		classMethods : {
			associate : function(models) {
				Order.belongsTo(models.User)
			}
		}
	});

	return Order;
};