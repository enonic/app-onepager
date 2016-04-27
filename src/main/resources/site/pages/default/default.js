var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var contentLib = require('/lib/xp/content');
var util = require('/lib/enonic/util');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var site = portalLib.getSite(); // Current site
    var siteConfig = portalLib.getSiteConfig(); //'com.enonic.app.onepager'
    var content = portalLib.getContent(); // Current content
    var view = resolve('default.html'); // The view to render

    var model = createModel(); // The model to send to the view

    function createModel() {

        var page = content.page;
        var slides = page ? page.config && page.config.slide : [];
        // ensure it's an array, even if single element
        slides = util.data.forceArray(slides);

        // So the page knows if there is a banner or not
        var banner = true;
        if(!slides || (slides && slides[0] == null) || (slides[0].header == '')) {
            banner = false;
        }

        var social = {
            facebook: siteConfig.facebook,
            twitter: siteConfig.twitter,
            linkedin: siteConfig.linkedin,
            google: siteConfig.google,
            pintrest: siteConfig.pintrest,
            youtube: siteConfig.youtube
        };

        var addresses = util.data.forceArray(siteConfig.location);
        var addressCols = getAddressCols(addresses);
        for (var i = 0; i < addresses.length; i++) {
            if(addresses[i]) {
                addresses[i].usAddress = (!addresses[i].state || addresses[i].state == '') ? false : true;
            }
        }


        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = getPageTitle();
        model.metaDescription = getMetaDescription();
        model.siteName = site.displayName;
        model.editMode = req.mode == 'edit' ? true : false;
        model.content = portalLib.getContent();
        model.logoUrl = getLogoUrl(siteConfig);
        model.copyright = siteConfig.copyrightMessage;
        model.banner = banner;
        model.slides = slides;
        model.social = social;
        model.addresses = addresses;
        model.addressCols = addressCols;


        return model;
    }

    function getPageTitle() {
        return content.displayName;
    }

    function getMetaDescription() {
        var htmlMeta = getExtradata(content, 'html-meta');
        var metaDescription = htmlMeta.htmlMetaDescription || '';
        return metaDescription;
    }

    function getExtradata(content, property) {
        var appNamePropertyName = app.name.replace(/\./g,'-');
        // Short way of getting nested objects
        // http://blog.osteele.com/posts/2007/12/cheap-monads/
        var extraData = ((content.x || {})[appNamePropertyName] || {})[property] || {};
        return extraData;
    }

    function getLogoUrl(moduleConfig) {
        var logoContentId = moduleConfig['logo'];
        if (logoContentId) {
            return portalLib.imageUrl( {
                id: logoContentId,
                //scale: 'block(115,26)'
                scale: 'width(115)'
            });
        } else {
            return portalLib.assetUrl( {
                path: 'images/logo.png'
            });
        }
    }

    function getAddressCols(addresses) {
        if(!addresses || (addresses && addresses.constructor != Array)) return 12;
        var numAddresses = addresses.length < 1 ? 1 : addresses.length;
        return (12 / addresses.length).toString();
    }

    return {
        body: thymeleaf.render(view, model)
    };
}