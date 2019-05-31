var contentLib = require('/lib/xp/content'),
    portal = require('/lib/xp/portal'),
    thymeleaf = require('/lib/thymeleaf'),
    util = require('/lib/util');

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

        var component = portal.getComponent(),
            config = component.config,
            imageIDs = config.images ? util.data.forceArray(config.images) : null,
            contents = imageIDs? getImagesInOrder(imageIDs) : null;

        model.heading = config.heading || 'Missing heading';
        model.description = config.description || 'Missing description';
        model.shuffleID = 'gallery-' + component.path.replace(/\/+/g, '-');
        model.galleryItems = contents? getGalleryItems(contents) : null;
        model.categories = contents? getCategories(contents, imageIDs) : null;

        return model;
    }

    function getImagesInOrder(imageIDs) {
        var images = [], img;
        imageIDs.map(function(imageID) {
            img = contentLib.get({key: imageID});
            if(img) {
                images.push(img);
            }
        });
        return images;
    }

    // Get the buckets from config.images
    function getBuckets(imageIDs) {
        var result = contentLib.query( {
            count: 0,
            query: '_id IN (' + JSON.stringify(imageIDs).replace('[','').replace(']','') + ')',
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
        return result? result.aggregations.tags.buckets : null;
    }

    // Create array of objects with required info about each image
    function getGalleryItems(contents) {
        var galleryItems = [],
            galleryItem,
            categories,
            liClass,
            groups,
            catGroup,
            scale,
            i,
            catLength;

        contents.map(function(imageContent) {
            galleryItem = {};
            galleryItem.caption = imageContent.data.caption;

            categories = util.data.forceArray(imageContent.data.tags);
            liClass = 'gallery-item col-sm-6 col-md-4 col-lg-3 ';
            groups = '[';

            for (i = 0, catLength = categories.length; i < catLength; i++) {
                catGroup = '"' + categories[i].replace(/\s+/g, '-').toLowerCase() + '"';
                liClass += ' ' + catGroup;
                groups += catGroup;
                if(i != categories.length - 1) {
                    groups += ',';
                }
            }
            groups += ']';
            galleryItem.liClass = liClass;
            galleryItem.groups = groups;

            scale = 736;
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
    function getCategories(contents, imageIDs) {

        var cats = getCategoriesArray(contents),
            buckets = getBuckets(imageIDs),
            categories = [],
            n, l,
            bucketLength,
            catLength;

        for (n = 0, bucketLength = buckets.length; n < bucketLength; n++) {
            if(buckets[n].docCount > 0) {

                for (l = 0, catLength = cats.length; l < catLength; l++) {
                    if(buckets[n].key == cats[l].toLowerCase()) {
                        categories.push({tag: cats[l], key: buckets[n].key.replace(/\s+/g, '-')});
                        l = cats.length;
                    }
                }

            }
        }
        return categories;
    }

    function getCategoriesArray(contents) {
        var cats = [],
            i, j,
            contentLength,
            tagsLength,
            tags;

        for (i = 0, contentLength = contents.length; i < contentLength; i++) {
            tags = util.data.forceArray(contents[i].data.tags);
            for(j = 0, tagsLength = tags.length; j < tagsLength; j++) {
                cats.push(tags[j]);
            }
        }
        return cats;
    }

    return renderView();
}