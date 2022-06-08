const path = require('path');
const execa = require('execa');

const diag = path.resolve(__dirname, 'diag.py');
const exec = (script, ...opts) => {
    const { stderr, stdout } = execa.sync(script, ...opts);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout;
};

module.exports = function transform(type, input, filename = '-') {
    return exec(diag, [ type, filename ], { input });
};
