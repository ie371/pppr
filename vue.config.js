module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/pppr/' : '/'
};

// var webpack = require('webpack');

// module.exports = {
// 	configureWebpack: {
// 		plugins: [
// 			new webpack.DefinePlugin({
// 				'process.env.API_URL': JSON.stringify(process.env.API_URL)
// 			})
// 		]
// 	}
// };
