var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var util = require('/lib/enonic/util');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = portal.getComponent();
    var view = resolve('banner.html');

    var model = createModel();

    function createModel() {
        var model = {
            heading: component.config.heading,
            banners: getBanners(),
            ulClass: ulClass()
        };

        return model;
    }

    function getBanners() {

        var banners = component.config.banner;

        if (!banners) {
            return null;
        }
        return util.data.forceArray(banners);
    }

    function ulClass() {
        var path = component.path;
        var classVal = 'enonicarousel__list promotion-banner__list';

        // Only use parallax if the banner is on the top of the page.
        if(path == 'main/0' || path == 'main/0/center/0') {
            classVal += ' parallax';
        }
        return classVal;
    }

    return {
        body: thymeleaf.render(view, model)
    };
}