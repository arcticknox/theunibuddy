/**
 * Fetch API
 * @param {String} path
 * @param {String} method
 * @param {Object} body
 * @returns
 */
const fetchAPI = async (path, method = 'GET', body, accessToken) => {
  const baseUrl = process.env.REACT_APP_APPSERVER_PATH;
  const url = baseUrl ? baseUrl + path : 'http://localhost:8080' + path;
  const options = {
    method,
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;
  const response = await fetch(url, options);
  const { success, data } = await response.json();
  return { success, data };
};

export default fetchAPI;
