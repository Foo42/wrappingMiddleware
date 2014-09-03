module.exports = function wrappingMiddleware(before, after) {

    return function middleware(request, response, next) {

        function requestDone() {
            response.removeListener('finish', requestDone);
            response.removeListener('close', requestDone);

            after(request, response);
        }

        response.on('finish', requestDone);
        response.on('close', requestDone);

        before(request, response, next);
    };
};
