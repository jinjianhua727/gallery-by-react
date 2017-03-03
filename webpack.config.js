var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: __dirname + '/src',
	entry: "./js/root.js",
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
				  presets: ['react', 'es2015']
				}
			},
			// {
		 //        test:/\.json$/,
		 //        loader:'json-loader'
		 //      },
		      {
		        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
		        loader: 'url-loader?limit=8192'
		      },
		]
	},
	output: {
		path: __dirname + '/src/',
		filename: "bundle.js"
	}
}