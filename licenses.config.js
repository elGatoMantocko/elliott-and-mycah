module.exports = {
  isValidLicense: (license) => {
    const valid = new RegExp(
      '\\b(mit|apache\\b.*2|bsd|isc|unlicense|cc0-1.0|python-2.0|cc-by-4.0|cc-by-3.0|wtfpl|0bsd|gpl-3.0+)\\b',
      'i',
    );
    return valid.test(license);
  },
};
