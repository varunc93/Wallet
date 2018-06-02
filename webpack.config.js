const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = () => {
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

    return{
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public", "dist") ,
            filename: "bundle.js"
        },

        //loader

        module: {
            rules: [{
                loader:"babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
               }]
        },

        plugins: [
            CSSExtract
            ],
        //source map

        // devtool: "inline-source-map" //better for source map purposes once css file is split up
        //"cheap-module-eval-source-map", also used for development purposes but has a bad source map once css file is split up
        devtool: "source-map", //used for production purposes, takes more time but creates a smaller sized bundle

        devServer:  {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: '/dist/'
        },
    }
};