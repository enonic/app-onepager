
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
      var partName = '';
      if(config.menuItem && config.menuName && config.menuName.trim() != '') {
          partName = config.menuName;
      } else {
          partName = config.heading;
      }
      if(partName && partName != ''){
          partName = partName.trim().toLowerCase().split(' ').join('-');
      }
      return partName;
  };

exports.getMenuNames = function(part, siteUrl) {
    siteUrl = siteUrl || '';
    var obj = {};
    var name = '';
    var config = part.config;
    if (config.menuItem == true) {
        var name = config.menuName;
        if(!name || name.trim() == '') {
            name = config.heading;
        }
        if(!name || name.trim() == '') {
            return null;
        } else {
            obj.name = name.trim();
            obj.hash = siteUrl + '#' + name.trim().toLowerCase().split(' ').join('-');
        }
    } else {
        return null;
    }

    return obj;
};