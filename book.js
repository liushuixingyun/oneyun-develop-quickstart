var pkg = require('./package.json');

module.exports = {
    title: "快速入门",
    author: "ONEYUN Team",
    language: "zh",
    gitbook: '3.2.2',
    plugins: [
        '-sharing',
        'toc',
        'codetabs',
        "theme-api"
    ],
    variables: {
        version: pkg.version
    },
    pluginsConfig: {
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
