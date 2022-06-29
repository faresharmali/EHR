
const NodeCouchdb = require('node-couchdb');

const couch = new NodeCouchdb({
    auth: {
        user: process.env.DBUSER,
        password: process.env.DBPASS
    }
});

module.exports = couch;