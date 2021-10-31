function validateParams(params) {
	for (let i = 0; i < params.length; i++) {
		if (!params[i] && params[i] != 0) {
			console.log(params[i], i);
			return false;
		}
	}
	return true;
}

module.exports = { validateParams };
