var xeon = require('xeon');
var thymeleaf = require('/lib/xp/thymeleaf');
var portal = require('/lib/xp/portal');

exports.get = function (req) {
    var component = portal.getComponent();

    var layoutClass = 'container layout layout-1-col';
    if(component.path == 'main/0') {
        layoutClass += ' first-layout';
    }

    var view = resolve('layout-1-col.html');
    var model = {
        centerRegion: component.regions["center"],
        layoutClass: layoutClass
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, model)
    };

};