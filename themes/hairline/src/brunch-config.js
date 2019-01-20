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
};

exports.modules = {
  autoRequire: {
    'js/app.js': ['js/app']
  }
};

exports.plugins = {
  babel: {presets: ['@babel/preset-env', '@babel/preset-react']},

  postcss: {
    processors: [
      require('autoprefixer')
    ]
  },

  sass: {
    mode: 'native',
    options: {
      includePaths: [].concat(
        'node_modules/jeet',
        'node_modules/gutenberg-web-type/src/style'
      )
    }
  },
};

