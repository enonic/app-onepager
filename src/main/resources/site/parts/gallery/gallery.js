var contentLib = require('/lib/xp/content');
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var util = require('/lib/enonic/util');

exports.get = handleGet;

function handleGet(req) {

    function renderView() {
        var body = thymeleaf.render( resolve('gallery.html'), createModel() );

        return {
            contentType: 'text/html',
            body: body
        };
    }

    function createModel() {
        var model = {};

        var component = portal.getComponent();
        var config = component.config;

        var result = contentLib.query( {
            start: 0,
            count: 100,
            query: getImagesQuery(config.images),
            contentTypes: [
                'media:image'
            ],
            aggregations: {
                tags: {
                    terms: {
                        field: 'data.tags',
                        order: '_term asc',
                        size: 100
                    }

                }
            }
        });

        var contents = result.hits;

        model.galleryItems = contents? getGalleryItems(contents) : null;
        model.categories = getCategories(result);
        model.heading = config.heading || 'Missing heading';
        model.description = config.description || 'Missing description';
        model.shuffleID = 'gallery-' + component.path.replace(/\/+/g, '-');

        return model;
    }

    function getImagesQuery(imageIDs) {
        var imageIdArray = util.data.forceArray(imageIDs);

        var query = '_id IN (' + JSON.stringify(imageIdArray).replace('[','').replace(']','') + ')';

        return query;
    }

    function getGalleryItems(contents) {
        var galleryItems = [];

        contents.map(function(imageContent) {
            var galleryItem = {};
            galleryItem.caption = imageContent.data.caption;

            var categories = util.data.forceArray(imageContent.data.tags);
            var liClass = 'gallery-item col-sm-6 col-md-4 col-lg-3 ';
            var groups = '[';

            for (var i = 0; i < categories.length; i++) {
                var catGroup = '"' + categories[i].replace(/\s+/g, '-').toLowerCase() + '"';
                liClass += ' ' + catGroup;
                groups += catGroup;
                if(i != categories.length - 1) {
                    groups += ',';
                }
            }
            groups += ']';
            galleryItem.liClass = liClass;
            galleryItem.groups = groups;

            var scale = 736;
            if(imageContent.x.media.imageInfo.imageWidth < scale) {
                scale = imageContent.x.media.imageInfo.imageWidth;
            }
            galleryItem.thumb = portal.imageUrl({
                id: imageContent._id,
                scale: 'block(235,159)'
            });
            galleryItem.imgUrl = portal.imageUrl( {
                id: imageContent._id,
                scale: 'width(' + scale + ')'
            });
            galleryItems.push(galleryItem);
        });

        return galleryItems;
    }

    // Get the categories with tag and key
    function getCategories(result) {

        var cats = getCategoriesArray(result.hits);
        var buckets = result.aggregations.tags.buckets;

        var categories = [];
        for (var n = 0; n < buckets.length; n++) {
            if(buckets[n].docCount > 0) {

                for (var l = 0; l < cats.length; l++) {
                    if(buckets[n].key == cats[l].toLowerCase()) {
                        categories.push({tag: cats[l], key: buckets[n].key.replace(/\s+/g, '-')});
                        l = cats.length;
                    }
                }

            }
        }
        return categories;
    }

    function getCategoriesArray(hits) {
        var cats = [];
        for (var i = 0; i < hits.length; i++) {
            var tags = util.data.forceArray(hits[i].data.tags);
            for(var j = 0; j < tags.length; j++) {
                cats.push(tags[j]);
            }
        }
        return cats;
    }

    return renderView();
}