const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

const Env = require('./constants').Env;

const BASE_PLUGINS = [
    new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, '../', 'tsconfig.json'),
        workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
    }),
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
    ]), 
    new webpack.ProvidePlugin({
        THREE: 'three',
    }),
];

const BUNDLE_ANALYZER = [new BundleAnalyzerPlugin({ analyzerMode: 'static' })];

const PLUGINS_BY_ENV = {
    [Env.PRODUCTION]: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    [Env.STAGE]: [
        new webpack.NamedModulesPlugin()
    ],
    [Env.DEVELOPMENT]: [
        new CopyWebpackPlugin([
            { from: 'src/data', to: 'api/v1' }
        ]),
        new webpack.EnvironmentPlugin({
            BACKEND_SERVER_IP: `dev-node1-agentviz-backend.cellexplore.net`
        })
    ]
};

module.exports = (env, analyzer) => [
    ...BASE_PLUGINS,
    ...(analyzer ? BUNDLE_ANALYZER : []),
    ...(PLUGINS_BY_ENV[env] || [])
];
