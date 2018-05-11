// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'js/vendors.js': /^node_modules|src\/vendor/,
      'js/app.js': /^src\/js/
    }
  },

  stylesheets: {
    joinTo: {
      'css/vendor.css': /^node_modules|src\/vendor/,
      'css/style.css': /^src\/sass/
    }
  }
};

exports.paths = {
  public: 'static',
  watched: ['src']
}

exports.plugins = {
  babel: {presets: ['latest', 'react']},
  postcss: {processors: [require('autoprefixer'), require('precss')]},
  hugo: {sourceFolder: './'}
};
