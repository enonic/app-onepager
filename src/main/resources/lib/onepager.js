
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
