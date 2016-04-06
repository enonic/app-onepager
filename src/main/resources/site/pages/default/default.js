var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var contentLib = require('/lib/xp/content');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var site = portalLib.getSite(); // Current site
    var siteConfig = portalLib.getSiteConfig(); //'com.enonic.app.onepager'
    var content = portalLib.getContent(); // Current content
    var view = resolve('default.html'); // The view to render
    var model = createModel(); // The model to send to the view

    function createModel() {

        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = getPageTitle();
        model.metaDescription = getMetaDescription();
        model.siteName = site.displayName;
        model.editMode = req.mode == 'edit' ? true : false;
        model.content = portalLib.getContent();
        model.logoUrl = getLogoUrl(siteConfig)

        return model;
    }

    function getPageTitle() {
        return content['displayName'];
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

    return {
        body: thymeleaf.render(view, model)
    };
}