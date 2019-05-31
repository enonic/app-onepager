var libs = {
    thymeleaf: require('/lib/thymeleaf')
};

// 404 page not found error
exports.handle404 = function (err) {
    var view = resolve('page-not-found.html');
    var model = {};
    return {
        body: libs.thymeleaf.render(view, model)
    };
};

// Other error
exports.handleError = function (err) {
    var view = resolve('error.html');
    var model = createModel();

    // Ignore 403 errors to make it compatible with ID Providers.
    if(err.status == 403) {
        return;
    }

    // Ignore errors for preview mode if debug is used
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }

    function createModel() {
        var model = {};
        model.errorCode = err.status;
        model.errorMessage = err.message;

        return model;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
};
