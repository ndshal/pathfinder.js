var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./js/pathfinder",
  output: {
    filename: "./js/bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["*", ".js"]
  },
  module: {
   loaders: [
     {
       test: [/\.js?$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
   ]
 }
};
