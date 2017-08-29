"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./../models/object");
const insertObject_1 = require("./../models/insertObject");
const dtobject_1 = require("./../models/dtobject");
const validateObjectsRequest_1 = require("./validate/validateObjectsRequest");
const logger_1 = require("./../ServerLogs/logger");
let object = new dtobject_1.dtObjects();
let validate = new validateObjectsRequest_1.ValidateObjectRequest();
let logger = new logger_1.ServerLogger();
class ObjectControllers {
    constructor() { }
    getObjectList(req, res, next) {
        logger.addInfo("Called get all objects");
        new object_1.Objects().getObjectList(req, res);
    }
    searchObject(req, res, next) {
        logger.addInfo("Called search objects");
        new object_1.Objects().searchObject(req, res);
    }
    insertObject(req, res, next) {
        new insertObject_1.NewObject().insertObject(req, res);
        logger.addInfo("Called search objects");
    }
    insertObjectImage(req, res, next) {
        logger.addInfo("Called search object image");
        new insertObject_1.NewObject().insertObjectImage(req, res);
    }
    uploadImages() {
        logger.addInfo("Called upload image");
        return new insertObject_1.NewObject().uploadImage();
    }
    getObjectById(req, res, next) {
        logger.addInfo("Called get object by id");
        if (validate.checkGetObjectById(req, res, next)) {
            object.getObjectById(req, res);
        }
    }
    editObjectById(req, res, next) {
        logger.addInfo("Called update object by id");
        if (validate.checkEditObjectById(req, res, next)) {
            object.editObjectById(req, res);
        }
    }
    deleteObjectById(req, res, next) {
        logger.addInfo("Called delete object by id");
        if (validate.checkDeleteObjectById(req, res, next)) {
            object.deleteObjectById(req, res);
        }
    }
    mergeObjects(req, res, next) {
        logger.addInfo("Called merge objects");
        if (validate.checkMargeObjects(req, res, next)) {
            object.mergeObjects(req, res);
        }
    }
}
exports.ObjectControllers = ObjectControllers;
//# sourceMappingURL=/home/abul/Desktop/PROJECT-new/intrusion_detector/web/dist/server/controllers/objectController.js.map