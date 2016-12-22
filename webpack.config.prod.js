let path = require( 'path' );
let webpack = require( 'webpack' );
let HtmlWebpackPlugin = require( 'html-webpack-plugin' );


module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch' ,
			'webpack-dev-server/client?http://localhost:8000' ,
			// 'webpack/hot/only-dev-server',
			"./src/index" ]
	} ,
	plugins: [
		// new webpack.HotModuleReplacementPlugin()
		new webpack.NoErrorsPlugin() ,
		new HtmlWebpackPlugin( {
			showErrors: true ,
			chunks: [ 'app' ] ,
			template: 'src/index.ejs'
		} ) ,
		new webpack.LoaderOptionsPlugin( {
			options: {
				sassLoader: {
					includePaths: [ path.resolve( __dirname , "./src/" ) ]
				} ,
				context: '/' ,
				postcss: [
					require("lost")(),
					require( "postcss-cssnext" )(
						{
							browsers: '> 0%' ,
							customProperties: true ,
							colorFunction: true ,
							customSelectors: true ,
						} )
				]
			}
		} ) ] ,
	output: {
		path: path.join( __dirname , "www" ) ,
		filename: "[name].bundle.js"
	} ,

	devtool: 'cheap-module-eval-source-map' ,
	resolveLoader: {
		modules: [
			path.join( __dirname , "node_modules" )
		]
	} ,
	module: {
		rules: [
			{
				test: /\.(tsx?)$/ ,
				loaders: [ 'react-hot-loader/webpack' , 'ts-loader?silent=true' , 'tslint-loader' ]
			} ,
			{
				test: /\.(pcss)$/ ,
				loaders: [
					'style-loader' ,
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5' ,
					'postcss-loader?sourceMap' ,
				]
			} ,
			{
				test: /\.(scss|sass)$/ ,
				loaders: [
					'style-loader' ,
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5' ,
					'postcss-loader?sourceMap' ,
					'sass-loader?sourceMap' ,
				]
			} ,
			{
				test: /\.(eot|svg|ttf|otf|woff|woff2)$/ ,
				loader: 'file-loader'
			} ,
			{
				test: /\.(jpe?g|png|gif|svg)$/ ,
				loader: 'file-loader'
			} ]
	} ,
	resolve: {
		extensions: [ '.webpack.js' , '.web.js' , '.tsx' , '.js' , '.jsx' , '.ts' ]
	}
};


