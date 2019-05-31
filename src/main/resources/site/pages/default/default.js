var portalLib = require('/lib/xp/portal'),
    thymeleaf = require('/lib/thymeleaf'),
    contentLib = require('/lib/xp/content'),
    util = require('/lib/util');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var site = portalLib.getSite(), // Current site
        siteConfig = portalLib.getSiteConfig(), //'com.enonic.app.onepager'
        content = portalLib.getContent(), // Current content
        view = resolve('default.html'), // The view to render
        model = createModel(); // The model to send to the view

    function createModel() {

        var page = content.page,
            social = {
                facebook: siteConfig.facebook,
                twitter: siteConfig.twitter,
                linkedin: siteConfig.linkedin,
                google: siteConfig.google,
                pinterest: siteConfig.pinterest,
                youtube: siteConfig.youtube
            },
            addresses = util.data.forceArray(siteConfig.location),
            addressCols = getAddressCols(addresses);

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
        model.behindMenu = page.config.behindMenu ? 'behind' : '';
        model.hideContactInfo = page.config.hideContactInfo;


        return model;
    }

    function getMenuLayouts(content) {
        var components = util.data.forceArray( content.page.regions.main.components ),
            layouts = [],
            i, componentsLength = components.length;

        for (i = 0; i < componentsLength; i++) {
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
        var config = page.config,
            metaKeywords = util.data.forceArray( config['meta-keywords'] ),
            i, metaLength = metaKeywords.length;

        for (i = 0; i < metaLength; i++) {
            if(metaKeywords[i]) metaKeywords[i] = metaKeywords[i].trim();
        }

        metaKeywords = metaKeywords.join(',');

        //Remove trailing comma if it ends in a comma.
        while(metaKeywords.charAt(metaKeywords.length -1) === ',') {
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
                path: 'images/acme-logo.png'
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

        var obj = {},
            config = layout.config;

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