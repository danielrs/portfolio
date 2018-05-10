// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'js/vendors.js': /^src\/vendor/,
      'js/app.js': /^src\/app/
    }
  },

  stylesheets: {
    joinTo: {
      'css/app.css': /^src/
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
