const fs = require('fs');
const path = require('path');

const rxPaths = require('rxjs/_esm5/path-mapping');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const postcssImports = require('postcss-import');

const minimizeCss = false;
const baseHref = '';
const deployUrl = '';
const projectRoot = process.cwd();

const entryPoints = [
    'inline',
    'polyfills',
    'sw-register',
    'styles',
    'scripts',
    'vendor',
    'main'
];

const postcssPlugins = function(loader) {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@licen[cs]e|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
        autoprefixer: false,
        safe: true,
        mergeLonghand: false,
        discardComments: {
            remove: comment => !importantCommentRe.test(comment)
        }
    };
    return [
        postcssImports({
            resolve: (url, context) => {
                return new Promise((resolve, reject) => {
                    loader.resolve(context, url, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result);
                    });
                });
            },
            load: filename => {
                return new Promise((resolve, reject) => {
                    loader.fs.readFile(filename, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const content = data.toString();
                        resolve(content);
                    });
                });
            }
        }),
        postcssUrl({
            filter: ({ url }) => url.startsWith('~'),
            url: ({ url }) => {
                const fullPath = path.join(
                    projectRoot,
                    'node_modules',
                    url.substr(1)
                );
                return path
                    .relative(loader.context, fullPath)
                    .replace(/\\/g, '/');
            }
        }),
        postcssUrl([
            {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                filter: ({ url }) =>
                    url.startsWith('/') && !url.startsWith('//'),
                url: ({ url }) => {
                    if (deployUrl.match(/:\/\//) || deployUrl.startsWith('/')) {
                        // If deployUrl is absolute or root relative, ignore baseHref & use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${url}`;
                    } else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return (
                            baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${url}`.replace(/\/\/+/g, '/')
                        );
                    } else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${url}`.replace(
                            /\/\/+/g,
                            '/'
                        );
                    }
                }
            },
            {
                // TODO: inline .cur if not supporting IE (use browserslist to check)
                filter: asset =>
                    !asset.hash && !asset.absolutePath.endsWith('.cur'),
                url: 'inline',
                // NOTE: maxSize is in KB
                maxSize: 10
            }
        ]),
        autoprefixer()
    ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

const cssAssets = [
    path.join(process.cwd(), "src\\styles.css"),
    path.join(process.cwd(), "src\\plugins\\bootstrap\\css\\bootstrap.min.css"),
    path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.min.css"),
    path.join(process.cwd(), "src\\plugins\\admin-lte\\dist\\css\\AdminLTE.css")
  ];

const scriptAssets = [
    path.join(process.cwd(), 'src\\plugins\\jQuery\\jquery-2.2.3.min.js'),
    path.join(process.cwd(), 'src\\plugins\\bootstrap\\js\\bootstrap.min.js'),
    path.join(process.cwd(), 'src\\plugins\\cookie_js\\cookie.min.js'),
    path.join(process.cwd(), 'src\\plugins\\crypto-js\\core.min.js'),
    path.join(process.cwd(), 'src\\plugins\\crypto-js\\sha256.js'),
    path.join(process.cwd(), 'src\\plugins\\datatables-1.10.15\\media\\js\\jquery.dataTables.js'),
    path.join(process.cwd(), 'src\\plugins\\datatables-1.10.15\\media\\js\\dataTables.bootstrap.js'),
    path.join(process.cwd(), 'src\\plugins\\datatables-buttons-1.3.1\\js\\dataTables.buttons.min.js'),
    path.join(process.cwd(), 'src\\plugins\\datatables-buttons-1.3.1\\js\\buttons.bootstrap.min.js'),
    path.join(process.cwd(), 'src\\plugins\\datatables-select-1.2.2\\js\\dataTables.select.min.js'),
    path.join(process.cwd(), 'src\\plugins\\datatables-editor-1.6.1\\js\\dataTables.editor.min.js'),
    path.join(process.cwd(), 'src\\plugins\\datepicker\\bootstrap-datepicker.js'),
    path.join(process.cwd(), 'src\\plugins\\datepicker\\locales\\bootstrap-datepicker.zh-CN.js'),
    path.join(process.cwd(), 'src\\plugins\\admin-lte\\dist\\js\\app.js'),
    path.join(process.cwd(), 'src\\plugins\\xiangna\\js\\editor.xiangna.js'),
    path.join(process.cwd(), 'src\\plugins\\daterangepicker\\moment.min.js'),
    path.join(process.cwd(), 'src\\plugins\\daterangepicker\\daterangepicker.js'),
    path.join(process.cwd(), 'src\\plugins\\swiper\\swiper-3.4.2.min.js'),
    path.join(process.cwd(), 'src\\plugins\\ie\\compatible.js')
];

const commonConfig = {
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['./node_modules', './node_modules'],
        symlinks: true,
        alias: rxPaths(),
        mainFields: ['browser', 'module', 'main']
    },
    resolveLoader: {
        modules: ['./node_modules', './node_modules'],
        alias: rxPaths()
    },
    entry: {
        main: ['./src\\main.ts'],
        polyfills: ['./src\\polyfills.ts'],
        styles: [
            './src\\styles.css',
            './src\\plugins\\bootstrap\\css\\bootstrap.min.css',
            './node_modules\\font-awesome\\css\\font-awesome.min.css',
            './src\\plugins\\admin-lte\\dist\\css\\AdminLTE.css'
        ]
    },

    node: {
        fs: 'empty',
        global: true,
        crypto: 'empty',
        tls: 'empty',
        net: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    },
    devServer: {
        historyApiFallback: true
    }
};

module.exports = {
    entryPoints,
    postcssPlugins,
    cssAssets,
    scriptAssets,
    commonConfig
};
