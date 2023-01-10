/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const thirdPartyPath = path.resolve(__dirname, '../');

const watchFolders = [thirdPartyPath];

module.exports = {
  resolver: {
    extraNodeModules: {
      '@fullstory/segment-react-native-plugin-fullstory': thirdPartyPath,
    },
  },
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
