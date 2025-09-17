const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // transformer: {
  //   getTransformOptions: async () => ({
  //     transform: {
  //       experimentalImportSupport: false,
  //       inlineRequires: false, // Disable for better source maps
  //     },
  //   }),
  // },
  // serializer: {
  //   createModuleIdFactory: function () {
  //     return function (path) {
  //       // Use relative paths for better source map compatibility
  //       return path.replace(__dirname, '.');
  //     };
  //   },
  //   // Better source map generation
  //   processModuleFilter: function (module) {
  //     return true;
  //   },
  // },
  // symbolicator: {
  //   customizeFrame: (frame) => {
  //     if (frame.file && frame.file.includes('node_modules')) {
  //       // Mark vendor modules for better analysis
  //       frame.file = frame.file.replace(__dirname, '.');
  //     }
  //     return frame;
  //   },
  // },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
