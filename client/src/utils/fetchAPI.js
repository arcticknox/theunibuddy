/**
 * Fetch API
 * @param {String} url
 * @param {String} method
 * @param {Object} body
 * @returns
 */
 const fetchAPI = async (url, method = 'GET', body) => {
	const response = await fetch(url, {
		method,
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const { success, data } =  await response.json();
    if (success) return data;
    throw Error('API Error');
};

export default fetchAPI;
