var pkg = require('./package.json');

module.exports = {
    title: pkg.description,
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
        version: pkg.version,
        description: pkg.description
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
