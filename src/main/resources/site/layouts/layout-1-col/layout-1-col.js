var thymeleaf = require('/lib/thymeleaf'),
    portal = require('/lib/xp/portal');

exports.get = function (req) {
    var component = portal.getComponent(),
        config = component.config,
        view = config.fullWidth ? resolve('layout-1-col-full-width.html') : resolve('layout-1-col.html'),
        model = {
            centerRegion: component.regions["center"],
            layoutClass: getLayoutClass(config),
            id: getIdName(config)
        };

    function getIdName(config) {

        if(!config.menuItem || !config.menuName || config.menuName.trim() == '') {
            return null;
        }

        return config.menuName.trim().toLowerCase().split(' ').join('-');
    }

    function getLayoutClass(config) {
        var layoutClass = 'layout layout-1-col';

        if(isFirstLayout(component.path)) {
            layoutClass += ' first-layout';
        }

        if(config.noPadding) {
            layoutClass += ' noPadding';
        }

        layoutClass += ' ' + config.color;

        return layoutClass;
    }

    // rounded corners on first layout
    function isFirstLayout(componentPath) {
        var content = portal.getContent(),
            components = content.page.regions.main.components || [],
            layouts = [],
            i, compLength = components.length;

        for (i = 0; i < compLength; i++) {
            if(components[i].type === 'layout') {
                layouts.push(components[i]);
            }
        }
        if(layouts[0].path == componentPath) {
            return true;
        }
        return false;
    }

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };

};