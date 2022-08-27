const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    // Mock the barcode-scanner module
    '@capacitor-community/barcode-scanner':
      '__mocks__/@capacitor-community/barcode-scanner.js',
  },
};
