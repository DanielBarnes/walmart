var Hapi = require('hapi');
var Joi = require('joi');
var Data = require('./data.json');

var server = new Hapi.Server();

server.connection({ port: 8000 });

server.route({
    method: 'get',
    path: '/',
    handler: function (request, reply) {
        reply('ok');
    }
});
server.route({
    method: 'get',
    path: '/search',
    handler: function (request, reply) {
        var query = request.query.q.toUpperCase();
        server.methods.search(query, request.query.populate, function (err, result) {
            reply(result);
        });
    },
    config: {
        validate: {
            query: {
                q: Joi.string().required(),
                populate: Joi.boolean()
            }
        }
    }
});

server.method({
    name: 'search',
    method: function (query, full, next) {
        var results = [];
        Data.forEach(function (item) {
            if (item.name.toUpperCase().indexOf(query) !== -1) {
                if (full) {
                    results.push(item);
                } else {
                    results.push(item.itemId);
                }

            }
        });
        next(null, results);
    }
});

server.start(function () {
    console.log('server running at %s',  server.info.uri);
});
