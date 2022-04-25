/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/',
      },
    },
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
};
