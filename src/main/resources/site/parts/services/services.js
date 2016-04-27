var onepager = require('onepager');
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

exports.get = handleGet;

function handleGet(req) {

    function renderView() {
        var view = resolve('services.html');
        var model = createModel();

        return {
            status: 200,
            contentType: 'text/html',
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        var model = {};

        var component = portal.getComponent();
        var config = component.config;
        var services = config.service;

        // Make it an array when there is only one service.
        if(!(services instanceof Array)) {
            services = [services];
        }

        // Make it show the sample data when nothing is entered.
        if(!services[0] || (services[0].header == '' || services[0].header == null)) {
            services = null;
        }

        //Make the dynamic ID
        model.id = onepager.getIdName(config);

        model.services = services;
        model.heading = config.heading || null;
        model.description = config.description || null;

        return model;
    }

    return renderView();
}
