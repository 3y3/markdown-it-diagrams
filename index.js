const path = require('path');
const execa = require('execa');

const diag = path.resolve(__dirname, 'diag.py');
const exec = (script, ...opts) => {
    const { stderr, stdout } = execa.sync(script, ...opts);

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout;
}

const Diagrams = ({
    types = [ 'blockdiag', 'actdiag', 'seqdiag', 'nwdiag', 'rackdiag', 'packetdiag' ],
    ignoreErrors = false
} = {}) => (md) => {
    const defaultRenderer = md.renderer.rules.fence;

    md.renderer.rules.fence = function(tokens, idx, options, env, self) {
        const token = tokens[idx];

        if (token.tag !== 'code' || !types.includes(token.info)) {
            return defaultRenderer(tokens, idx, options, env, self);
        }

        try {
            return exec(diag, [ token.info, '-' ], {
                input: token.content
            });
        } catch (error) {
            if (ignoreErrors) {
                return token.content;
            }

            throw error;
        }
    }
};

module.exports = { Diagrams };
