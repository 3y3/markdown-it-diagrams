'use strict';

const transform = require('./lib/transform');

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
            return transform(token.info, token.content);
        } catch (error) {
            if (ignoreErrors) {
                return token.content;
            }

            throw error;
        }
    }
};

module.exports = { Diagrams, transform };
