
/**
 * Generates dynamic IDs based on the component path
 * @param id String to prepend the ID with
 * @param Obj Component
 * @returns String
 */
exports.getId = function(id, component) {
    var path = component.path;
    id += path.replace(/\//g, '-');

    return id;
};

exports.getIdName = function(config) {
      var layoutMenuName = '';
      if(config.menuItem && config.menuName && config.menuName.trim() != '') {
          layoutMenuName = config.menuName.trim();
      } else {
          return null;
      }
      if(layoutMenuName && layoutMenuName != ''){
          return layoutMenuName.trim().toLowerCase().split(' ').join('-');
      }
      return null;
  };

exports.getMenuNames = function(layout, siteUrl) {
    siteUrl = siteUrl || '';
    var obj = {};
    var config = layout.config;
    if(!config || !config.menuItem || !config.menuName || config.menuName.trim() == '') {
        return null;
    }

    obj.name = config.menuName.trim();
    obj.hash = siteUrl + '#' + config.menuName.trim().toLowerCase().split(' ').join('-');

    return obj;
};