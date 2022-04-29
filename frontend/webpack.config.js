var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: { "stream": false },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },    
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    },
    

};
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
    chainWebpack: (config) => {
      config.plugin("polyfills").use(NodePolyfillPlugin);
    },

}