const path = require( 'path' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
delete defaultConfig.entry
delete defaultConfig.output

const isProduction = process.env.NODE_ENV === 'production';

let cssUse = [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'];

if (isProduction) {
	cssUse = [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'];
}

module.exports = {
	...defaultConfig,
	entry: {
		plugin: ['./src/js/plugin.js', './src/scss/editor.scss'],
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve( process.cwd(), 'build' ),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.s?css$/,
				use: cssUse
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].min.css' }),
		! isProduction &&  new BrowserSyncPlugin({
			files: '**/*.php',
			injectChanges: true,
			proxy: 'http://one.wordpress.test'
		  })
	].filter( Boolean )
};
