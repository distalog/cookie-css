'use strict';

exports.Handler = function (cookieRegex = '^css_') {

    return function ( cookieRegexParam, request, h ) {

        let output = '';
        for (const k in request.state) {
            if (k.match(cookieRegexParam)) {
                output += request.state[k] + '\n';
            }
        }

        const response = h.response(output);
        response.type('text/css');
        return response;
    }.bind(undefined, cookieRegex);
};
