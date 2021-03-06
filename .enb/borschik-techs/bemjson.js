var _JSON = require('borschik/lib/techs/json');

exports.Tech = _JSON.Tech.inherit({

    minimize: function(content) {
        // remove formating if minimize
        try {
            return JSON.stringify(JSON.parse(content));
        } catch(e) {
            return JSON.stringify(eval(this.content));
        }
    },

    File: exports.File = _JSON.File.inherit({
        processInclude: function(baseFile) {
            // parse json

            var entities;
            try {
                entities = JSON.parse(this.content);
            } catch(e) {
                entities = eval(this.content);
            }

            for (var entity in entities) {
                var ent = entities[entity];
                // freeze images with cssBase.processLink
                var ent_str = JSON.stringify(ent);
                ent = ent_str.match(/"?'?url"?'?\s*:\s*'?"?([a-z0-9\/\._-]+)"?'?/);
                if(ent) {
                    ent_str = ent_str.replace('"'+ent[1]+'"', this.child('linkUrl', this.pathTo(ent[1])).process(baseFile));
                    entities[entity] = JSON.parse(ent_str);
                }
            }
            // formatted output
            return JSON.stringify(entities, null, 4);
        }
    })

});
