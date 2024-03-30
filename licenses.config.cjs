/* istanbul ignore file */

module.exports = {
  /**
   * Function to check validity of a dependencies license.
   * @param {string} license to check
   * @returns {boolean} true if the license is valid
   */
  isValidLicense(license) {
    const valid = new RegExp(
      '\\b(mit|apache\\b.*2|bsd|isc|unlicense|cc0-1.0|python-2.0|cc-by-4.0|cc-by-3.0|wtfpl|0bsd|gpl-3.0+|BlueOak-1.0.0)\\b',
      'i',
    );
    return valid.test(license);
  },
  /**
   * Function to ignore packages - likely because they don't have a valid (or known) license.
   * @param {string} packageName package name
   * @returns {boolean} true if the package should be ignored
   */
  ignorePackages(packageName) {
    return /\@esbuild|\@swc|\@rollup|fsevents/i.test(packageName);
  },
};
