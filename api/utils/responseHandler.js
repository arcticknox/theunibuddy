/**
 *  Response Handler
 * @param {Object} res
 * @param {Object} data
 * @param {String} error
 * @param {Number} responseCode
 */
const responseHandler = (res, data, error, responseCode) => {
	if (error) {
		res.status(500);
		res.json(error);
	}
	const status = responseCode ? responseCode : 200;
	res.status(status);
	res.json(data);
};

export default responseHandler;
