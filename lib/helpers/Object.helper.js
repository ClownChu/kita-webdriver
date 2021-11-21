'use strict'

const { NotSupportedYet } = require("../types/error")

/**
 * Provides with methods to assist with operations in general {@link Object}
 */
class ObjectHelper {
    /**
     * @static Verify if `needle` value contains in `object`
     * @param {string} needle 
     * @param {Object} object 
     * @returns {bool} true if `needle` is included
     */
    static includes(needle, object) {
        return ObjectHelper.findKey(needle, object) !== null
    }
    /**
     * @static Verify if key is exists in `object`
     * @param {string} key 
     * @param {Object} object 
     * @returns {bool} true if `key` exists
     */
    static includesKey(key, object) {
        return Object.keys(object).includes(key)
    }
    /**
     * @static Get value containing inside `object`
     * @param {string} needle 
     * @param {Object} object 
     * @returns {Object} Value contained in the object if `needle` is included
     */
    static get(needle, object) {
        const objectKey = ObjectHelper.findKey(needle, object)
        if (objectKey === null) {
            return null
        }

        return object[objectKey]
    }
    /**
     * @static Find `key` of {@link Object} where `needle` is included
     * @param {string} needle 
     * @param {Object} object 
     * @returns {string} `object` key if `needle` is included
     */
    static findKey(needle, object) {
        const objectKeys = Object.keys(object)
        for (let i = 0; i < objectKeys.length; i++ ) {
            const objectValue = object[objectKeys[i]]
            switch (typeof objectValue) {
                case "string":
                    if (objectValue === needle) {
                        return objectKeys[i]
                    }
                    break
                case "object":
                    if (objectValue.includes(needle)) {
                        return objectKeys[i]
                    }
                    break
                default:
                    throw new NotSupportedYet(typeof objectValue)
            }
        }

        return null
    }
}

module.exports = {
    ObjectHelper
}