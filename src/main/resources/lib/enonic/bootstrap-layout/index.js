var libs = {
    portal: require('/lib/xp/portal'),
    util: require('/lib/enonic/util')
};

/**
 * Get all defined regions with proper Bootstrap column CSS class
 * @returns {Array}
 */
exports.getRegionsWithColumnInfo = function(defaultColumnConfig) {
    var regions = libs.util.region.get(),
        columnClasses = exports.getColumnClasses(defaultColumnConfig),
        i, len;

    for (i = 0, len = regions.length; i < len; i++) {
        regions[i].columnClass = columnClasses[i];
    }

    return regions;
};

/**
 * Get Bootstrap type column CSS class based on layout column widths
 * @returns {Array}
 */
exports.getColumnClasses = function(defaultColumnConfig) {
    var columnConfig = getColumnConfig(defaultColumnConfig),
        columnPercentages = columnConfig.split('-'),
        columnClasses = [],
        i, len;

    for (i = 0, len = columnPercentages.length; i < len; i++) {
        var columnClass = Math.round((columnPercentages[i] / 100) * 12);
        columnClasses.push('col-md-' + columnClass);
    }

    return columnClasses;
};

/**
 * Get layout column config (column widths)
 * @returns {string}
 */
function getColumnConfig(defaultColumnConfig) {
    var columnConfig = defaultColumnConfig,
        component = libs.portal.getComponent(); // Current component

    if (component.config.columnConfig) {
        columnConfig = component.config.columnConfig;
    }

    return columnConfig;
}