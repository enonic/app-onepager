var onepager = require('onepager');
var thymeleaf = require('/lib/xp/thymeleaf');
var portal = require('/lib/xp/portal');

exports.get = handleGet;

function handleGet(req) {

    function renderView() {
        var view = resolve('header.html');
        var model = createModel();

        return {
            contentType: 'text/html',
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        var model = {};
        var component = portal.getComponent();
        var config = component.config;

        //Make the dynamic ID
        model.id = onepager.getIdName(config);
        model.heading = config.heading || 'Configure heading';
        model.description = config.description || 'Configure description';

        return model;
    }

    return renderView();
}
