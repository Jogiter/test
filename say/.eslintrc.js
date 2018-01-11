module.exports = {
    "root": true,
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};