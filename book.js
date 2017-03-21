var pkg = require('./package.json');

module.exports = {
    title: "快速入门",
    author: "ONEYUN Team",
    language: "zh",
    gitbook: '3.2.2',
    plugins: [
        {name:'docs-theme', version: 'git+https://github.com/liushuixingyun/gitbook-plugin-docs-theme.git'},
        'sitemap',
        '-sharing',
        'toc',
        'codetabs',
        "theme-api"
    ],
    variables: {
        version: pkg.version
    },
    pluginsConfig: {
        sitemap: {
            hostname: "https://github.com/liushuixingyun/yunhuni-platform-docs"
        },
        "theme-api": {
            "theme": "dark",
            "languages": [{
                "lang": "java",
                "name": "JAVA",
                "default": true
            }, {
                "lang": "php",
                "name": "PHP"
            }, {
                "lang": "node",
                "name": "Node.js"
            }]
        }
    }
};
