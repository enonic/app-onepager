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
            query: getGalleryItemQuery(config),
            contentTypes: [
                app.name + ':gallery-img'
            ],
            aggregations: {
                tags: {
                    terms: {
                        field: 'data.category',
                        order: '_term asc',
                        size: 100
                    }

                }
            }
        });
        var contents = result.hits;

        model.galleryItems = getGalleryItems(contents);
        model.categories = getCategories(result);
        model.heading = config.heading || 'Missing heading';
        model.description = config.description || 'Missing description';

        return model;
    }

    function getGalleryItemQuery(config) {
        var galleryItems = config.galleryItems;
        galleryItems = util.data.forceArray(galleryItems);

        var query = '_id IN (';

        for (var i = 0; i < galleryItems.length; i++) {
            query += '"' + galleryItems[i] + '"';
            if(i + 1 != galleryItems.length) {
                query += ', ';
            }
        }
        return query + ')';
    }

    function getGalleryItems(contents) {
        util.log(contents);
        var galleryItems = [];

        for (var i = 0; i < contents.length; i++) {
            var galleryItem = contents[i].data;

            //Make categories array if there is only one
            galleryItem.category = util.data.forceArray(galleryItem.category);

            //Make the class for the list items.
            var liClass = 'gallery-item ';
            for (var j = 0; j < galleryItem.category.length; j++) {
                liClass += ' ' + galleryItem.category[j].replace(/\s+/g, '-').toLowerCase();
            }
            galleryItem.liClass = liClass;

            var img = contentLib.get( {
                key: galleryItem.image
            });
            var scale = 736;
            if(img.x.media.imageInfo.imageWidth < 736) {
                scale = img.x.media.imageInfo.imageWidth;
            }

            //small picture URL 370 250
            galleryItem.thumb = portal.imageUrl( {
                id: galleryItem.image,
                //scale: 'block(370, 250)'
                scale: 'block(235, 159)'
            });
            // large image 736 wide
            galleryItem.imgUrl = portal.imageUrl( {
                id: galleryItem.image,
                scale: 'width(' + scale + ')'
            });

            galleryItems.push(galleryItem);
        }
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
            for(var j = 0; j < hits[i].data.category.length; j++) {
                cats.push(hits[i].data.category[j]);
            }
        }
        return cats;
    }

    return renderView();
}

