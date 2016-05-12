var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var util = require('/lib/enonic/util');

exports.get = handleGet;

function handleGet(req) {

    function renderView() {
        var view = resolve('features.html');
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
        var features = util.data.forceArray(config.feature);

        // Make it show the sample data when nothing is entered.
        if(!features[0] || (features[0].header == '' || features[0].header == null)) {
            features = null;
        }

        model.features = features;
        model.heading = config.heading || null;
        model.description = config.description || null;

        return model;
    }

    return renderView();
}
