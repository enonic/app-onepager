var thymeleaf = require('/lib/xp/thymeleaf');
var portal = require('/lib/xp/portal');
var onepager = require('onepager');

exports.get = function (req) {
    var component = portal.getComponent();

    var view = resolve('layout-1-col.html');
    var model = {
        centerRegion: component.regions["center"],
        layoutClass: getLayoutClass(component.config),
        id: getIdName(component.config),
        color: component.config.color
    };

    function getIdName(config) {

        if(!config.menuItem || !config.menuName || config.menuName.trim() == '') {
            return null;
        }

        return config.menuName.trim().toLowerCase().split(' ').join('-');
    }

    function getLayoutClass(config) {
        var layoutClass = 'container layout layout-1-col';
        if(component.path == 'main/0') {
            layoutClass += ' first-layout';
        }
        layoutClass += ' ' + config.color;
        return layoutClass;
    }

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };

};