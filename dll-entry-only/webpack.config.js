const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	// mode: "development" || "production",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{ test: /\.(png|svg)$/, loader: "file-loader" }
		]
	},
	entry: {
		dll: ["./example"],
		dll2: ["./example2"]
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name]-[chunkhash].js",
		library: "[name]_[chunkhash]",
		chunkFilename: "[id]-[chunkhash].js"
		// libraryTarget: 'umd',
		// umdNamedDefine: true
	},
	optimization: {
		concatenateModules: true, // this is enabled by default in production mode
		minimize: false
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]-[contenthash].css",
      		chunkFilename: "[id]-[contenthash].css"
		}),
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist", "[name]-manifest.json"),
			name: "[name]_[chunkhash]",
			entryOnly: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new ManifestPlugin()
	]
};
