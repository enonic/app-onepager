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

        var social = {
            facebook: siteConfig.facebook,
            twitter: siteConfig.twitter,
            linkedin: siteConfig.linkedin,
            google: siteConfig.google,
            pinterest: siteConfig.pinterest,
            youtube: siteConfig.youtube
        };

        var addresses = util.data.forceArray(siteConfig.location);
        var addressCols = getAddressCols(addresses);
        for (var i = 0; i < addresses.length; i++) {
            if(addresses[i]) {
                addresses[i].usAddress = (!addresses[i].state || addresses[i].state == '') ? false : true;
            }
        }

        //util.log(getMenuParts());

        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = getPageTitle();
        model.metaDescription = page.config['meta-description'];
        model.metaKeywords = getMetaKeywords(page);
        model.siteName = site.displayName;
        model.editMode = req.mode == 'edit' ? 'edit' : '';
        model.content = portalLib.getContent();
        model.logoUrl = getLogoUrl(siteConfig);
        model.copyright = siteConfig.copyrightMessage;
        model.social = social;
        model.addresses = addresses;
        model.addressCols = addressCols;
        model.layouts = getMenuLayouts(content);
        model.bannerTop = page.config.bannerTop ? 'banner' : '';
        model.hideContactInfo = page.config.hideContactInfo;


        return model;
    }

    function getMenuLayouts(content) {
        var components = content.page.regions.main.components;
        components = util.data.forceArray(components);

        var layouts = [];
        for (var i = 0; i < components.length; i++) {
            if(components[i].type == 'layout') {
                var layout = getMenuNames(components[i]);
                if(layout) layouts.push(layout);
            }
        }
        if(!content.page.config.hideContactInfo) {
            layouts.push({hash: '#contact', name: 'Contact'});
        }

        return layouts;
    }

    function getMetaKeywords(page) {
        var config = page.config;
        var metaKeywords = config['meta-keywords'];
        metaKeywords = util.data.forceArray(metaKeywords);
        for (var i = 0; i < metaKeywords.length; i++) {
            if(metaKeywords[i]) metaKeywords[i] = metaKeywords[i].trim();
        }
        metaKeywords = metaKeywords.join(',');
        //Remove trailing comma if it ends in a comma.
        while(metaKeywords.charAt(metaKeywords.length -1) == ',') {
            metaKeywords = metaKeywords.substring(0, metaKeywords.length -1);
        }
        return metaKeywords;
    }


    function getPageTitle() {
        return content.displayName;
    }

    function getLogoUrl(moduleConfig) {
        var logoContentId = moduleConfig.logo;
        if (logoContentId) {
            return portalLib.imageUrl( {
                id: logoContentId,
                //scale: 'block(115,26)'
                scale: 'height(25)'
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

    function getMenuNames(layout, siteUrl) {
        siteUrl = siteUrl || '';
        var obj = {};
        var config = layout.config;
        if(!config || !config.menuItem || !config.menuName || config.menuName.trim() == '') {
            return null;
        }

        obj.name = config.menuName.trim();
        obj.hash = siteUrl + '#' + config.menuName.trim().toLowerCase().split(' ').join('-');

        return obj;
    }

    return {
        body: thymeleaf.render(view, model)
    };
}