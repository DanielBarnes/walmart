var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
    method: 'get',
    path: '/',
    handler: function (request, reply) {
        reply('ok');
    }
});

server.start(function () {
    console.log('server running at %s',  server.info.uri);
});
