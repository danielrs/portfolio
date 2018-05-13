// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^bower_components|node_modules|vendor/,
    },
    entryPoints: {
      'js/app.js': 'js/app.js'
    }
  },

  stylesheets: {
    joinTo: {
      'css/vendor.css': /^bower_components|node_modules|vendor/,
      'css/style.css': /^sass/
    }
  }
};

exports.paths = {
  public: '../static',
  watched: ['js', 'sass', 'vendor']
}

exports.modules = {
  autoRequire: {
    'js/app.js': ['js/app']
  }
}

exports.plugins = {
  babel: {presets: ['latest', 'react']},

  postcss: {
    processors: [
      require('autoprefixer')
    ]
  },

  sass: {
    options: {
      includePaths: [].concat(
        'node_modules/jeet',
        'node_modules/sassline/assets/sass',
      )
    }
  },

  hugo: {sourceFolder: './'}
};
