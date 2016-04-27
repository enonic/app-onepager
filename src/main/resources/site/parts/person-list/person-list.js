var contentLib = require('/lib/xp/content');
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var onepager = require('onepager');
var util = require('/lib/enonic/util');

exports.get = handleGet;

function handleGet(req) {
    // Render view
    function renderView() {

        var body = thymeleaf.render( resolve('person-list.html'), createModel() );
        return {
            body: body,
            contentType: 'text/html'
        };
    }

    // Build model
    function createModel() {
        // Fetch component config
        var component = portal.getComponent();
        var config = component.config;

        var id = onepager.getIdName(config);
        var scrollerId = onepager.getId('team-scroller-', component);

        var persons = [];
        var personContent = config.person || [];

        personContent = util.data.forceArray(personContent);

        // Make the persons object in groups of 3.
        for(var i = 0, j = 0; i < personContent.length; i++) {
            var person = contentLib.get( {key: personContent[i]});

            if(person) {
                var personData = person.data;
                var pageUrl = portal.pageUrl( {path: person._path})

                var personName = [
                    personData.firstName,
                    personData.middleName,
                    personData.lastName
                ].join(' ').trim();

                var personTitle = personData.jobTitle;

                // Prepare image URLs
                var imageContentId = personData.image;
                var imageContentUrl;
                if (imageContentId) {
                    imageContentUrl = portal.imageUrl( {
                        id: imageContentId,
                        scale: 'block(250,250)'
                    });
                }

                if (!persons[j] || !Array.isArray(persons[j])) {
                    persons[j] = [];
                }

                if(persons[j].length < 3) {
                    persons[j].push({
                        name: personName || 'Missing Name',
                        title: personTitle || 'Missing Title',
                        imageUrl: imageContentUrl || portal.assetUrl( {path: 'images/team1.jpg'}),
                        pageUrl: pageUrl
                    });
                } else {
                    j++;
                    persons[j] = [];
                    persons[j].push({
                        name: personName || 'Missing Name',
                        title: personTitle || 'Missing Title',
                        imageUrl: imageContentUrl || portal.assetUrl( {path: 'images/team1.jpg'}),
                        pageUrl: pageUrl
                    });
                }

            }

        }
        //util.log(persons);

        var model = {
            title: config.heading || 'Missing Heading',
            text: config.description || 'Missing description',
            persons: persons,
            id: id,
            scrollerId: scrollerId
        };
        return model;
    }

    // Return
    return renderView();
}
