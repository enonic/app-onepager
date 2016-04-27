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