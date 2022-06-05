const fs = require('fs');
const path = require('path');
const transform = require('@doc-tools/transform');
const { Diagrams } = require('../..');

const content = fs.readFileSync(path.resolve(__dirname, './example.yf.md'), 'utf8');

const { result: { html } } = transform(content, {
    plugins: [
        Diagrams()
    ]
});

fs.writeFileSync(path.resolve(__dirname, './example.html'), html);
