/**
 * AppError(code, message)
 */
class AppError extends Error {
  /**
   *
   * @param {String} code
   * @param {String} message
   */
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export default AppError;
