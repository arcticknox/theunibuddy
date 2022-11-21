/**
 *  Response Handler
 * @param {Object} res
 * @param {Object} data
 * @param {Number} responseCode
 */
const responseHandler = (res, data, responseCode = 200) => {
	const success = !(responseCode >= 400 && responseCode <= 599);
	res.status(responseCode).send({ success, data });
};

export default responseHandler;
