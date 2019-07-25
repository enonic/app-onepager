var thymeleaf = require('/lib/thymeleaf'),
    portal = require('/lib/xp/portal');

exports.get = handleGet;

function handleGet(req) {

    function renderView() {
        var view = resolve('header.html'),
            model = createModel();

        return {
            contentType: 'text/html',
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        var model = {},
            component = portal.getComponent(),
            config = component.config;

        model.heading = config.heading || 'Configure heading';
        model.description = config.description || 'Configure description';

        return model;
    }

    return renderView();
}
