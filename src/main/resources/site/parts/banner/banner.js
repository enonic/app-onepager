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
        var model = {};

        model.heading = component.config.heading;
        model.banners = getBanners();

        return model;
    }

    function getBanners() {
        var bannerArr = [];

        var banners = component.config.banner;

        if (banners) {
            bannerArr = util.data.forceArray(banners);
        }

        return bannerArr;
    }

    return {
        body: thymeleaf.render(view, model)
    };
}