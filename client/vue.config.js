/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8000',
      },
    },
  },
};
