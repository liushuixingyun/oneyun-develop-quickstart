var pkg = require('./package.json');

module.exports = {
    title: pkg.description,
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
        version: pkg.version,
        description: pkg.description
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
