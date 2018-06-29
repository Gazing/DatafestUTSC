let Actions = {
	onSubmitRegistration: function (data, callback) {
		$.ajax({
			url: "/api/registration",
			method: "POST",
			data: JSON.stringify(data),
			processData: false,
			contentType: "application/json",
			success: onSuccess(callback),
			error: onError(callback)
		})	
	}
};

let onSuccess = function (cb) {
	return function(result) {
		cb(null, result);
	};
};

let onError = function (cb) {
	return function (result) {
		cb (result, null);
	}
};

export default Actions;
