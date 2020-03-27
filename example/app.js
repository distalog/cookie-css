'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const cookieParamHandler = require("cookie-param-handler").Handler
const cssHandler = require("..").Handler

const start = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        debug: {
            request: '*',
            log: '*'
        },
        routes: {
            log: {
                collect: true
            },
            files: {
                relativeTo: "/",
            },
        }
    });

    await server.register(require('@hapi/inert'));

    server.route([{
        method: '*',
        path: '/static/{param?}',
        options: {
            pre: [cookieParamHandler()],
        },
        handler: {
            directory: {
                path: Path.join(__dirname, 'static'),
                listing: true,
            }
        }
    }, {
        method: 'GET',
        path: '/css',
        handler: cssHandler()
    }]);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();
