var mongoose = require('mongoose');
var Opportunity = function (models) {

    var access = require("../Modules/additions/access.js")(models);
    var _ = require('../node_modules/underscore');
    var mongoose = require('mongoose');
    var logWriter = require('../helpers/logWriter.js');
    var opportunitiesSchema = mongoose.Schemas['Opportunitie'];
    var DepartmentSchema = mongoose.Schemas['Department'];
    var objectId = mongoose.Types.ObjectId;
    var async = require('async');

    function ConvertType(array, type) {
        if (type === 'integer') {
            for (var i = array.length - 1; i >= 0; i--) {
                array[i] = parseInt(array[i]);
            }
        }
    };

    function caseFilter(filter, content) {
        var condition;

        for (var key in filter) {
            condition = filter[key];

            switch (key) {
                case 'Name':
                    content.push({'name': {$in: condition}});
                    break;
                case 'workflow':
                    content.push({'workflow': {$in: condition.objectID()}});
                    break;
                case 'Creation date':
                    content.push({
                        'creationDate': {
                            $gte: new Date(condition[0].start),
                            $lte: new Date(condition[0].end)
                        }
                    });
                    break;
                case 'Next action':
                    if (!condition.length) condition = [''];
                    content.push({'nextAction.desc': {$in: condition}});
                    break;
                case 'Expected revenue':
                    ConvertType(condition, 'integer');
                    content.push({'expectedRevenue.value': {$in: condition}});
                    break;
            }
        }
    };

    this.getByViewType = function (req, res, next) {
        var viewType = req.params.viewType;

        switch (viewType) {
            case "list":
                getFilter(req, res, next);
                break;
            case "form":
                getById(req, res, next);
                break;
            case "kanban":
                getForKanban(req, res, next);
        }
    };

    /**
     * Properties in __Opportunities__ are same as in __Leads__.
     *
     * Just choose __true__ or __false__ in `isOpportunitie` field.
     *
     * @module Opportunity
     */
    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http://192.168.88.122:8089/totalCollectionLength/Opportunities`
     *
     * This __method__ allows get count of opportunities.
     *
     * @example
     *     {
     *         "count": 15
     *     }
     *
     * @method totalCollectionLength
     * @param {String} Opportunities - Content Type
     * @instance
     */
    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http://192.168.88.122:8089/Opportunities/form/:id`
     *
     * This __method__ allows get all opportunities for `form` viewType.
     * @method Opportunities
     * @param {String} form - View type
     * @param {String} id - Id of Opportunity
     * @instance
     */

    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http://192.168.88.122:8089/Opportunities/kanban`
     *
     * This __method__ allows get all opportunities for `kanban` viewType.
     * @method Opportunities
     * @param {String} kanban - View type
     * @instance
     */

    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http://192.168.88.122:8089/Opportunities/list`
     *
     * This __method__ allows get all opportunities for `list` viewType.
     *
     * @example
     *        {"data":[{
     *        "_id":"5374c180503e85ec0e00000d",
     *        "__v":0,
     *        "attachments":[],
     *        "notes":[],
     *        "convertedDate":"2014-04-18T07:58:16.145Z",
     *        "isConverted":false,
     *        "source":"",
     *        "campaign":"",
     *        "editedBy":{
     *            "date":"2014-04-18T07:58:16.145Z",
     *            "user":{
     *                "_id":"52203e707d4dba8813000003",
     *                "login":"admin"
     *                }
     *            },
     *        "createdBy":{
     *            "date":"2014-04-18T07:58:16.145Z",
     *            "user":{
     *                "_id":"52203e707d4dba8813000003",
     *                "login":"admin"
     *                }
     *            },
     *        "sequence":3,
     *        "groups":{
     *            "group":[],
     *            "users":[],
     *            "owner":"52203e707d4dba8813000003"
     *            },
     *        "whoCanRW":"everyOne",
     *        "workflow":{
     *            "_id":"528cdcb4f3f67bc40b000006",
     *            "name":"New",
     *            "status":"New"
     *            },
     *        "reffered":"",
     *        "optout":false,
     *        "active":true,
     *        "color":"#4d5a75",
     *        "categories":{
     *            "name":"",
     *            "id":""
     *            },
     *        "priority":"P3",
     *        "expectedClosing":"2014-04-24T22:00:00.000Z",
     *        "nextAction":{
     *            "date":"2014-04-17T22:00:00.000Z",
     *            "desc":""
     *            },
     *        "internalNotes":"Applications where the whole universe has been hand drawn on paper sheets and then animated using the stop motion.",
     *        "salesTeam":"5256a08a77285cfc06000009",
     *        "salesPerson":null,
     *        "func":"",
     *        "phones":{
     *            "fax":"",
     *            "phone":"",
     *             "mobile":""
     *            },
     *        "email":"",
     *        "contactName":{
     *            "last":"",
     *            "first":""
     *            },
     *        "address":{
     *            "country":"USA",
     *            "zip":"",
     *            "state":"WA",
     *            "city":"Seattle",
     *            "street":""
     *            },
     *        "customer":{
     *            "_id":"5303bc0fae122c781b0000c2",
     *            "name":{
     *                "last":"Finn",
     *                "first":"Aaron"
     *            },
     *            "fullName":"Aaron Finn",
     *            "id":"5303bc0fae122c781b0000c2"
     *            },
     *        "company":null,
     *        "tempCompanyField":"",
     *        "creationDate":"2014-04-18T07:58:16.145Z",
     *        "expectedRevenue":{
     *            "currency":"$",
     *            "progress":0,
     *            "value":7000
     *            },
     *        "name":"Teavana",
     *        "isOpportunitie":true
     *        }]}
     *
     * @method Opportunities
     * @param {String} list - View type
     * @instance
     */

    function getFilter(req, res, next) {
        var Opportunities = models.get(req.session.lastDb, "Opportunities", opportunitiesSchema);
        var departmentSearcher;
        var contentIdsSearcher;
        var contentSearcher;
        var waterfallTasks;

        var or;
        var filterObj = {};
        var optionsObject = {};
        var data = req.query;
        var filter = data.filter;
        var query;
        var sort;
        var mid;

        var count = data.count ? data.count : 100;
        var page = data.page;
        var skip = (page - 1) > 0 ? (page - 1) * count : 0;

        if (data.sort) {
            sort = data.sort;
        } else {
            sort = {"editedBy.date": -1};
        }

        optionsObject['$and'] = [];
        filterObj['$or'] = [];
        or = filterObj['$or'];

        caseFilter(filter, or);

        console.dir(or[0]);

        switch (data.contentType) {
            case ('Opportunities'):
                mid = 25;
                optionsObject['$and'].push({'isOpportunitie': true});

                if (data && data.filter) {
                    optionsObject['$and'].push(filterObj);
                }
                break;
            case ('Leads'):
                mid = 24;
                optionsObject['$and'].push({'isOpportunitie': false});

                if (data.filter.isConverted) {
                    optionsObject['isConverted'] = true;
                    optionsObject['isOpportunitie'] = true;
                }
                if (data && data.filter) {
                    optionsObject['$and'].push(filterObj);
                }
                break;
        }

        if (!or.length) {
            delete filterObj['$or']
        }

        departmentSearcher = function (waterfallCallback) {
            models.get(req.session.lastDb, "Department", DepartmentSchema).aggregate(
                {
                    $match: {
                        users: objectId(req.session.uId)
                    }
                }, {
                    $project: {
                        _id: 1
                    }
                },

                waterfallCallback);
        };
        contentIdsSearcher = function (deps, waterfallCallback) {
            var arrOfObjectId = deps.objectID();
            var userId = req.session.uId;
            var everyOne = {
                whoCanRW: "everyOne"
            };
            var owner = {
                $and: [
                    {
                        whoCanRW: 'owner'
                    },
                    {
                        'groups.owner': objectId(userId)
                    }
                ]
            };
            var group = {
                $or: [
                    {
                        $and: [
                            {whoCanRW: 'group'},
                            {'groups.users': objectId(userId)}
                        ]
                    },
                    {
                        $and: [
                            {whoCanRW: 'group'},
                            {'groups.group': {$in: arrOfObjectId}}
                        ]
                    }
                ]
            };
            var whoCanRw = [everyOne, owner, group];
            var matchQuery = {
                $and: [
                    optionsObject,
                    {
                        $or: whoCanRw
                    }
                ]
            };

            Opportunities.aggregate(
                {
                    $match: matchQuery
                },
                {
                    $project: {
                        _id: 1
                    }
                },
                waterfallCallback
            );
        };

        contentSearcher = function (opportunitiesIds, waterfallCallback) {
            var queryObject = {_id: {$in: opportunitiesIds}};

            query = Opportunities
                .find(queryObject)
                .limit(count)
                .skip(skip)
                .sort(sort)
                .lean();

            switch (data.contentType) {
                case ('Opportunities'):
                {
                    query.populate('customer', 'name').
                        populate('workflow', '_id name status').
                        populate('salesPerson', 'name').
                        populate('createdBy.user', 'login').
                        populate('editedBy.user', 'login');
                }
                    break;
                case ('Leads'):
                {
                    query.select("_id createdBy editedBy name workflow contactName phones campaign source email contactName").
                        populate('company', 'name').
                        populate('workflow', "name status").
                        populate('createdBy.user', 'login').
                        populate('editedBy.user', 'login');
                }
                    break;
            }

            query.exec(waterfallCallback);
        };

        waterfallTasks = [departmentSearcher, contentIdsSearcher, contentSearcher];

        access.getEditWritAccess(req, req.session.uId, mid, function (access) {
            if (!access) {
                return res.status(403).send();
            }

            async.waterfall(waterfallTasks, function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(200).send({data: result});
            });
        });
    };

    this.getFilterValues = function (req, res, next) {
        var opportunity = models.get(req.session.lastDb, 'Opportunitie', opportunitiesSchema);

        opportunity.aggregate([
            {
                $group: {
                    _id               : null,
                    Name              : {
                        $addToSet: '$name'
                    },
                    'Creation date'   : {
                        $addToSet: '$creationDate'
                    },
                    /* 'Next action': {
                     $addToSet: '$nextAction.desc'
                     },*/
                    'Expected revenue': {
                        $addToSet: '$expectedRevenue.value'
                    }
                }
            }
        ], function (err, result) {
            if (err) {
                return next(err);
            }

            _.map(result[0], function (value, key) {
                switch (key) {
                    case 'Name':
                        result[0][key] = _.sortBy(value, function (num) {
                            return num
                        });
                        break;
                    case  'Expected revenue':
                        result[0][key] = _.sortBy(value, function (num) {
                            return num
                        });
                        break;
                    case  'Next action':
                        result[0][key] = _.sortBy(value, function (num) {
                            return num
                        });
                        break;

                }
            });

            res.status(200).send(result);
        });
    };

    function getForKanban(req, res, next) {
        var Opportunities = models.get(req.session.lastDb, "Opportunities", opportunitiesSchema);
        var departmentSearcher;
        var contentIdsSearcher;
        var contentSearcher;
        var waterfallTasks;

        var or;
        var filterObj = {};
        var optionsObject = {};
        var data = req.query;
        var filter = data.filter;
        var query;

        optionsObject['$and'] = [];
        filterObj['$or'] = [];
        or = filterObj['$or'];

        optionsObject['$and'].push({'isOpportunitie': true});

        if (data && data.filter) {
            optionsObject['$and'].push(filterObj);
        }

        caseFilter(filter, or);

        if (!or.length) {
            delete filterObj['$or']
        }

        departmentSearcher = function (waterfallCallback) {
            models.get(req.session.lastDb, "Department", DepartmentSchema).aggregate(
                {
                    $match: {
                        users: objectId(req.session.uId)
                    }
                }, {
                    $project: {
                        _id: 1
                    }
                },

                waterfallCallback);
        };
        contentIdsSearcher = function (deps, waterfallCallback) {
            var arrOfObjectId = deps.objectID();
            var userId = req.session.uId;
            var everyOne = {
                whoCanRW: "everyOne"
            };
            var owner = {
                $and: [
                    {
                        whoCanRW: 'owner'
                    },
                    {
                        'groups.owner': objectId(userId)
                    }
                ]
            };
            var group = {
                $or: [
                    {
                        $and: [
                            {whoCanRW: 'group'},
                            {'groups.users': objectId(userId)}
                        ]
                    },
                    {
                        $and: [
                            {whoCanRW: 'group'},
                            {'groups.group': {$in: arrOfObjectId}}
                        ]
                    }
                ]
            };
            var whoCanRw = [everyOne, owner, group];
            var matchQuery = {
                $and: [
                    optionsObject,
                    {
                        $or: whoCanRw
                    }
                ]
            };

            Opportunities.aggregate(
                {
                    $match: matchQuery
                },
                {
                    $project: {
                        _id: 1
                    }
                },
                waterfallCallback
            );
        };

        contentSearcher = function (opportunitiesIds, waterfallCallback) {
            var queryObject = {_id: {$in: opportunitiesIds}};

            query = Opportunities
                .find(queryObject)
                .populate('customer', 'name').
                populate('salesPerson', 'name').
                populate('workflow', '_id').
                sort({'sequence': -1}).
                limit(req.session.kanbanSettings.opportunities.countPerPage);

            query.exec(waterfallCallback);
        };

        waterfallTasks = [departmentSearcher, contentIdsSearcher, contentSearcher];

        access.getEditWritAccess(req, req.session.uId, 25, function (access) {
            if (!access) {
                return res.status(403).send();
            }

            async.waterfall(waterfallTasks, function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(200).send({
                    data      : result,
                    workflowId: data.workflowId,
                    fold      : (req.session.kanbanSettings.opportunities.foldWorkflows && req.session.kanbanSettings.opportunities.foldWorkflows.indexOf(data.workflowId.toString()) !== -1)
                });
            });
        });
    };

    function getById(req, res, next) {
        var id = req.query.id;
        var Opportunities = models.get(req.session.lastDb, "Opportunities", opportunitiesSchema);

        var departmentSearcher;
        var contentIdsSearcher;
        var contentSearcher;
        var waterfallTasks;

        departmentSearcher = function (waterfallCallback) {
            models.get(req.session.lastDb, "Department", DepartmentSchema).aggregate(
                {
                    $match: {
                        users: objectId(req.session.uId)
                    }
                }, {
                    $project: {
                        _id: 1
                    }
                },

                waterfallCallback);
        };

        contentIdsSearcher = function (deps, waterfallCallback) {
            var arrOfObjectId = deps.objectID();

            Opportunities.aggregate(
                {
                    $match: {
                        $and: [
                            {
                                $or: [
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    {whoCanRW: 'group'},
                                                    {'groups.users': objectId(req.session.uId)}
                                                ]
                                            },
                                            {
                                                $and: [
                                                    {whoCanRW: 'group'},
                                                    {'groups.group': {$in: arrOfObjectId}}
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        $and: [
                                            {whoCanRW: 'owner'},
                                            {'groups.owner': objectId(req.session.uId)}
                                        ]
                                    },
                                    {whoCanRW: "everyOne"}
                                ]
                            }
                        ]
                    }
                },
                {
                    $project: {
                        _id: 1
                    }
                },
                waterfallCallback
            );
        };

        contentSearcher = function (opportunitiesIds, waterfallCallback) {
            var queryObject = {_id: id};
            var query;

            query = Opportunities.findOne(queryObject);

            query.populate('company customer salesPerson salesTeam workflow')
                .populate('groups.users')
                .populate('groups.group')
                .populate('createdBy.user')
                .populate('editedBy.user')
                .populate('groups.owner', '_id login');

            query.exec(waterfallCallback);
        };

        waterfallTasks = [departmentSearcher, contentIdsSearcher, contentSearcher];

        async.waterfall(waterfallTasks, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send(result);
        });
    };
    /**
     * @module Leads
     */
    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http:/192.168.88.122:8089/totalCollectionLength/Leads`
     *
     * This __method__ allows get count of Leads.
     *
     * @example {
     *         "count": 35
     *     }
     *
     * @method totalCollectionLength
     * @param {String} Leads - Content type
     * @instance
     */
    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http:/192.168.88.122:8089/Leads/form/:id`
     *
     * This __method__ allows get all Leads for `form` viewType.
     * @method Leads
     * @param {String} form - View type
     * @param {String} id - Id of Lead
     * @instance
     */

    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http:/192.168.88.122:8089/Leads/kanban`
     *
     * This __method__ allows get all Leads for `kanban` viewType.
     * @method Leads
     * @param {String} kanban - View type
     * @instance
     */

    /**
     * __Type__ `GET`
     *
     * Base ___url___ for build __requests__ is `http://192.168.88.122:8089/Leads/list`
     *
     * This __method__ allows get all Leads for `list` viewType.
     *
     * @example
     *        {"data":[{
     *        "_id":"5374c181503e85ec0e000010",
     *        "__v":0,
     *        "attachments":[],
     *        "notes":[],
     *        "convertedDate":"2014-04-18T07:58:16.145Z",
     *        "isConverted":false,
     *        "source":"",
     *        "campaign":"",
     *        "editedBy":{
     *            "date":"2014-04-18T07:58:16.145Z",
     *            "user":{
     *                "_id":"52203e707d4dba8813000003",
     *                "login":"admin"
     *                }
     *            },
     *        "createdBy":{
     *            "date":"2014-04-18T07:58:16.145Z",
     *            "user":{
     *                "_id":"52203e707d4dba8813000003",
     *                "login":"admin"
     *                }
     *            },
     *        "sequence":3,
     *        "groups":{
     *            "group":[],
     *            "users":[],
     *            "owner":"52203e707d4dba8813000003"
     *            },
     *        "whoCanRW":"everyOne",
     *        "workflow":{
     *            "_id":"528cdcb4f3f67bc40b000006",
     *            "name":"New",
     *            "status":"New"
     *            },
     *        "reffered":"",
     *        "optout":false,
     *        "active":true,
     *        "color":"#4d5a75",
     *        "categories":{
     *            "name":"",
     *            "id":""
     *            },
     *        "priority":"P3",
     *        "expectedClosing":"2014-04-24T22:00:00.000Z",
     *        "nextAction":{
     *            "date":"2014-04-17T22:00:00.000Z",
     *            "desc":""
     *            },
     *        "internalNotes":"Applications where the whole universe has been hand drawn on paper sheets and then animated using the stop motion.",
     *        "salesTeam":"5256a08a77285cfc06000009",
     *        "salesPerson":null,
     *        "func":"",
     *        "phones":{
     *            "fax":"",
     *            "phone":"",
     *             "mobile":""
     *            },
     *        "email":"",
     *        "contactName":{
     *            "last":"",
     *            "first":""
     *            },
     *        "address":{
     *            "country":"USA",
     *            "zip":"",
     *            "state":"WA",
     *            "city":"Seattle",
     *            "street":""
     *            },
     *        "customer":{
     *            "_id":"5303bc0fae122c781b0000c2",
     *            "name":{
     *                "last":"Finn",
     *                "first":"Aaron"
     *            },
     *            "fullName":"Aaron Finn",
     *            "id":"5303bc0fae122c781b0000c2"
     *            },
     *        "company":null,
     *        "tempCompanyField":"",
     *        "creationDate":"2014-04-18T07:58:16.145Z",
     *        "expectedRevenue":{
     *            "currency":"$",
     *            "progress":0,
     *            "value":7000
     *            },
     *        "name":"Wildy Jimi",
     *        "isOpportunitie":false
     *        }]}
     *
     * @method Leads
     * @param {String} list - View type
     * @instance
     */
};

module.exports = Opportunity;