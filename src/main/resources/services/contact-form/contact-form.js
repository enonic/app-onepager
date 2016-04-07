var onepager = require('/lib/onepager');
var contentLib = require('/lib/xp/content');
//var util = require('/lib/enonic/util');

exports.post = handlePost;
exports.get = handleGet;

function handlePost(req) {

    var p = req.params;
    var saveLocation = '/one-pager/inbox'; //TODO: Make this dynamic
    var body = {};

    if(p.name && p.email && p.message) {
        var result = contentLib.create( {
            parentPath: saveLocation,
            displayName: p.name,
            requireValid: false,
            contentType: 'base:unstructured',
            branch: 'draft',
            data: {
                name: p.name,
                email: p.email,
                message: p.message
            }
        });

        if (result._id) {
            body.type = 'success';
            body.message = 'Message received!';
        } else {
            body.type = 'error';
            body.message = 'There was a problem. Message did not go through.'
            log.error('Message content error from Contact Us form.');
        }


    } else {
        body.type = 'error';
        body.message = 'Missing required field.'
    }



    return {
        body: body,
        contentType: 'application/json'
    };
}

// For testing
function handleGet(req) {
    //util.log(req);
    return {
        body: {type: 'error', message: 'There was a problem. Message did not go through.'},
        contentType: 'application/json'
    };
}