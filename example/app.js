'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const cookieParamHandler = require("@distalog/cookie-param-handler").Handler
//const cssHandler = require("@distalog/cookie-css").Handler
const cssHandler = require("..").Handler

const start = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        routes: {
            files: {
                relativeTo: "/",
            },
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
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
    });
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();
