module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
      "sass-loader",
    ],
  },

  {
    test: /\.mp4$/,
    use: 'file-loader',
}, {
    test: /\.mp4$/,
    use:{
      loader: 'url?limit=10000&mimetype=video/mp4'
    }
   
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: {
      loader: 'file-loader',
      options:{
        name: 'images/[name].[ext]',
      }
    }
  }
];
