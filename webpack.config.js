module.exports = {
	context: __dirname, //+ '/app',
    entry: [
        './index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                	presets: ['es2015']
                }
            }
        ]
    },
    output: {
    	path: __dirname,// + '/app',
        filename: 'bundle.js'
    }
};

// wersja działająca wywołania:
// webpack-dev-server --config webpack.config.js --watch
