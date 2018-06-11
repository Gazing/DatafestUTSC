function findOne(list, params) {
	var result;
	list.every(function (user) {
		var accepted = Object.keys(params).every(function (item) {
			return (user[item] === params[item])
		});
		if (accepted) {
			result = (user);
			return false;
		}
		return true;
	});
	return result;
}

module.exports = {findOne: findOne};
