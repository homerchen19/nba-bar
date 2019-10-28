const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages(
  withCSS({
    cssModules: true,
    webpack(config, { isServer }) {
      config.target = 'electron-renderer';

      if (isServer) {
        const antStyles = /antd-mobile\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }

      return config;
    },
    exportPathMap() {
      return {
        '/home': { page: '/home' },
        '/live': { page: '/live' },
        '/preview': { page: '/preview' },
        '/scoreboard': { page: '/scoreboard' },
        '/settings': { page: '/settings' },
        '/standings': { page: '/standings' },
      };
    },
  })
);
