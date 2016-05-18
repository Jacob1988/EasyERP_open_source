module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var historySchema = new mongoose.Schema({
        date: {type: Date, default: Date.now},
        trackedObj: {type: ObjectId, default: null},
        collectionName: {type: String, default: ''},
        changedField: {type: String, default: ''},
        newValue: {type: Object, default: null},
        editedBy: {type: ObjectId, ref: 'Users', default: null}
    }, {collection: 'History'});

    mongoose.model('History', historySchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas['History'] = historySchema;
})();