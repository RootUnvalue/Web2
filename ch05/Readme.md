Npm-Package Info
"express": "^4.18.2",
"express-handlebars": "^7.1.2"
--save-dev
"eslint": "^8.50.0",
"jest": "^29.7.0",
"portfinder": "^1.0.32",
"puppeteer": "^21.3.4"


Eslint Setting
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
    ],
    "rules": {
    }
}
