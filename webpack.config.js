    const path = require('path');
    const webpack = require('webpack');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
    }
    else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
    }

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
                CSSExtract,
                new webpack.DefinePlugin({
                    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                    'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                    'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                    'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                    'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                    'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
                })
                ],
            //source map

            // devtool: "inline-source-map" //better for source map purposes once css file is split up
            //"cheap-module-eval-source-map", also used for development purposes but has a bad source map once css file is split up
            devtool: "source-map", //used for production purposes, takes more time but creates a smaller sized bundle

            devServer:  {
                contentBase: path.join(__dirname, "public"),
                historyApiFallback: true,
                publicPath: '/dist/'
            }
        };
    };