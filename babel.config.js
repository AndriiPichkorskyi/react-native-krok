module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module:react-native-dotenv',
      {
        envPath: '.env',
        moduleName: '@env',
        path: './.env',
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
