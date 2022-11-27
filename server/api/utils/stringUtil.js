/**
 * Split domain from email
 * @param {String} email
 * @returns
 */
const splitDomainFromEmail = (email) => {
  return email.split('@').pop();
};

export {
  splitDomainFromEmail,
};
