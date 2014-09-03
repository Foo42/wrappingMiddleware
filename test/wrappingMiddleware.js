require('chai').should();
var EventEmitter = require('events').EventEmitter;
var wrappingMiddleware = require('../lib/wrappingMiddleware');

describe('wrapping middleware', function () {
    it('should fire the before function when called', function (done) {
        function before() {
            done();
        }

        function end() {}

        var middleware = wrappingMiddleware(before, end);

        var fakeResponse = new EventEmitter();
        var fakeRequest = {};

        middleware(fakeRequest, fakeResponse, function () {});

    });

    it('should fire the after function when response raises finish event', function (done) {
        function before(request, response, next) {
            next();
        }

        function end() {
            done();
        }

        var fakeResponse = new EventEmitter();
        var fakeRequest = {};

        var middleware = wrappingMiddleware(before, end);
        middleware(fakeRequest, fakeResponse, function () {
            setTimeout(function () {
                fakeResponse.emit('finish');
            }, 10);
        });

    });

    it('should fire the after function when response raises close event', function (done) {
        function before(request, response, next) {
            next();
        }

        function end() {
            done();
        }

        var fakeResponse = new EventEmitter();
        var fakeRequest = {};

        var middleware = wrappingMiddleware(before, end);
        middleware(fakeRequest, fakeResponse, function () {
            setTimeout(function () {
                fakeResponse.emit('close');
            }, 10);
        });

    });
});
