const loaders = {
	rules: [
		{
			test: /\.(tsx?)$/,
			loaders: ['react-hot-loader/webpack', 'ts-loader?silent=true&configFileName=src/tsconfig.json', 'tslint-loader']
		},

		{
			test: /\.(pcss)$/,
			loader: [
				'isomorphic-style-loader',
				'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!postcss-loader?sourceMap'
			]

		},
		{
			test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
			loader: 'file-loader?emitFile=false&name=fonts/font-[sha512:hash:base64:7].[ext]'
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/,
			loader: 'file-loader?emitFile=false&name=images/img-[sha512:hash:base64:7].[ext]'
		}
	]
};


module.exports = {
	loaders: loaders
};
