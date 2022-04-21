/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
      },
    },
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
};
