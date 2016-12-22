let path = require( 'path' );
let webpack = require( 'webpack' );
let HtmlWebpackPlugin = require( 'html-webpack-plugin' );
let VendorChunkPlugin = require('webpack-vendor-chunk-plugin');

module.exports = {
	entry : {
		app : [
			'react-hot-loader/patch' ,
			'webpack-dev-server/client?http://localhost:8000' ,
			// 'webpack/hot/only-dev-server',
			"./src/index" ] ,
		vendor : [
			'react' ,
			'react-dom' ,
		]
	} ,
	target : 'web' ,
	plugins : [
		new webpack.optimize.CommonsChunkPlugin( {
			name : "vendor" ,
			filename : "vendor.js" ,
		} ) ,
		// new VendorChunkPlugin('vendor'),
		new webpack.NoErrorsPlugin() ,
		new HtmlWebpackPlugin( {
			showErrors : true ,
			chunks : [ 'app','vendor' ] ,
			template : 'src/index.ejs'
		} ) ,
		new webpack.LoaderOptionsPlugin( {
			options : {
				sassLoader : {
					includePaths : [ path.resolve( __dirname , "./src/" ) ]
				} ,
				context : '/' ,
				postcss : [
					require( "lost" )() ,
					require( "postcss-cssnext" )(
						{
							browsers : '> 0%' ,
							customProperties : true ,
							colorFunction : true ,
							customSelectors : true ,
						} )
				]
			}
		} ) ] ,
	output : {
		path : path.join( __dirname , "www" ) ,
		filename : "[name].bundle.js"
	} ,

	devtool : 'cheap-module-eval-source-map' ,
	resolveLoader : {
		modules : [
			path.join( __dirname , "node_modules" )
		]
	} ,
	module : {
		rules : [
			{
				test : /\.(tsx?)$/ ,
				loaders : [ 'react-hot-loader/webpack' , 'awesome-typescript-loader?silent=true' , 'tslint-loader' ]
			} ,
			{
				test : /\.(pcss)$/ ,
				loaders : [
					'style-loader' ,
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5' ,
					'postcss-loader?sourceMap' ,
				]
			} ,
			{
				test : /\.(scss|sass)$/ ,
				loaders : [
					'style-loader' ,
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5' ,
					'postcss-loader?sourceMap' ,
					'sass-loader?sourceMap' ,
				]
			} ,
			{
				test : /\.(eot|svg|ttf|otf|woff|woff2)$/ ,
				loader : 'url-loader'
			} ,
			{
				test : /\.(jpe?g|png|gif|svg)$/ ,
				loader : 'url-loader'
			} ]
	} ,
	resolve : {
		extensions : [ '.webpack.js' , '.web.js' , '.tsx' , '.js' , '.jsx' , '.ts' ]
	} ,
	devServer : {
		inline : true ,
		port : 8000 ,
		proxy : {
			'**' : 'http://localhost:8080'
		} ,
		stats : {
			// Config for minimal console.log mess.
			// assets: false,
			warnings : true ,
			// colors: true,
			// version: false,
			// modules: true,
			// hash: false,
			// timings: false,
			chunks : true ,
			chunkModules : false ,
			chunkOrigins : true
		}
	}
};


