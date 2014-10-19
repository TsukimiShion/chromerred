/* Copyright 2014 Tsukimi Shion
 *
 * chromerred is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * chromerred is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with chromerred.  If not, see <http://www.gnu.org/licenses/>.
 *
*/

/* exported chromerred */
var chromerred = new function(){
    "use strict";

    /* global chrome: false */

    this.runtime = new function(){
        /**
         * Please see [chrome.runtime](https://developer.chrome.com/extensions/runtime)
         * @class runtime
         * @static
         * @namespace chromerred
         */
        this.getBackgroundPage = function(){
            /**
             *
             * @method getBackgroundPage
             * @return {Deferred Object}
             * @example
             *     chromerred.runtime.getBackgroundPage()
             *     .then(function(backgroundPage){
             *         //
             *     });
             */
            var d = $.Deferred();
            chrome.runtime.getBackgroundPage(function(backgroundPage){
                if (chrome.runtime.lastError !== undefined){
                    d.reject(chrome.runtime.lastError);
                } else {
                    d.resolve(backgroundPage);
                }
            });
            return d.promise();
        };
    };

    this.storage = new function(){
        /**
         * Please see [chrome.storage](https://developer.chrome.com/extensions/storage)
         *
         * @class storage
         * @static
         * @namespace chromerred
         */

        function StorageArea(storage){
            /**
             * The class of the chromerred.storage.sync and chromerred.storage.local .
             * You can not access this class.
             * Please see [chrome.storage#type-StorageArea](https://developer.chrome.com/extensions/storage#type-StorageArea)
             *
             * @class StorageArea
             * @constructor
             * @namespace chromerred.storage
             */
            this.get = function(keys){
                /**
                 *
                 * @method get
                 * @param {String|Array|null} keys
                 * @return {Deferred Object}
                 * @example
                 *     chromerred.storage.sync.get(null)
                 *     .then(function(items){
                 *         //
                 *     });
                 */
                var d = $.Deferred();
                storage.get(keys, function(items){
                    if (chrome.runtime.lastError !== undefined){
                        d.reject(chrome.runtime.lastError);
                    } else {
                        d.resolve(items);
                    }
                });
                return d.promise();
            };
            this.set = function(items){
                /**
                 *
                 * @method set
                 * @param {Object} items
                 * @return {Deferred Object}
                 * @example
                 *     // ex1
                 *     chromerred.storage.sync.set({name: "John"})
                 *     .then(function(){
                 *         //
                 *     });
                 * @example
                 *     // ex2
                 *     // This is equivalent to ex1.
                 *     chromerred.storage.sync.set("name", "John")
                 *     .then(function(){
                 *         //
                 *     });
                 */
                var d = $.Deferred();
                var elem = {};
                if (arguments.length === 1){
                    elem = items;
                } else {
                    elem[items] = arguments[1];
                }
                storage.set(elem, function(){
                    if (chrome.runtime.lastError !== undefined){
                        d.reject(chrome.runtime.lastError);
                    } else {
                        d.resolve();
                    }
                });
                return d.promise();
            };
            this.remove = function(keys){
                /**
                 *
                 * @method remove
                 * @param {String|Array} keys
                 * @return {Deferred Object}
                 * @example
                 *     // ex1
                 *     chromerred.storage.sync.remove("John")
                 *     .then(function(){
                 *         //
                 *     });
                 * @example
                 *     // ex2
                 *     // This is equivalent to ex1.
                 *     chromerred.storage.sync.remove(["Mike", "John"])
                 *     .then(function(){
                 *         //
                 *     });
                 */
                var d = $.Deferred();
                storage.remove(keys, function(){
                    if (chrome.runtime.lastError !== undefined){
                        d.reject(chrome.runtime.lastError);
                    } else {
                        d.resolve();
                    }
                });
                return d.promise();
            };
            this.clear = function(){
                /**
                 *
                 * @method clear
                 * @return {Deferred Object}
                 * @example
                 *     // ex1
                 *     chromerred.storage.sync.clear()
                 *     .then(function(){
                 *         //
                 *     });
                 */
                var d = $.Deferred();
                storage.clear(function(){
                    if (chrome.runtime.lastError !== undefined){
                        d.reject(chrome.runtime.lastError);
                    } else {
                        d.resolve();
                    }
                });
                return d.promise();
            };

            this.getBytesInUse = function(keys){
                /**
                 *
                 * @method getBytesInUse
                 * @return {Deferred Object}
                 * @example
                 *     // ex1
                 *     chromerred.storage.sync.getBytesInUse("John")
                 *     .then(function(bytesInUse){
                 *         //
                 *     });
                 */
                var d = $.Deferred();
                storage.getBytesInUse(keys, function(byte){
                    if (chrome.runtime.lastError !== undefined){
                        d.reject(chrome.runtime.lastError);
                    } else {
                        d.resolve(byte);
                    }
                });
                return d.promise();
            };
        }

        /**
         * 
         * @property sync
         * @for chromerred.storage
         * @type chromerred.storage.StorageArea
         */

        /**
         * 
         * @property local
         * @for chromerred.storage
         * @type chromerred.storage.StorageArea
         */

        this.sync = new StorageArea(chrome.storage.sync);
        this.local = new StorageArea(chrome.storage.local);
    };

    this.tabs = new function(){
        /**
         * 
         * Please see [chrome.tabs](https://developer.chrome.com/extensions/tabs)
         *
         * @class tabs
         * @static
         * @namespace chromerred
         */
        this.get = function(tabId){
            /**
             *
             * @method get
             * @return {Deferred Object}
             * @param {integer} tabId
             * @example
             *     // ex1
             *     chromerred.tabs.get(tabId)
             *     .then(function(tab){
             *         //
             *     });
             */
            var d = $.Deferred();
            chrome.tabs.get(tabId, function(tab){
                if (chrome.runtime.lastError !== undefined){
                    d.reject(chrome.runtime.lastError);
                } else {
                    d.resolve(tab);
                }
            });
            return d.promise();
        };

        this.getCurrent = function(){
            /**
             *
             * @method getCurrent
             * @return {Deferred Object}
             * @example
             *     // ex1
             *     chromerred.tabs.getCurrent()
             *     .then(function(tab){
             *         //
             *     });
             */
            var d = $.Deferred();
            chrome.tabs.getCurrent(function(tab){
                if (chrome.runtime.lastError !== undefined){
                    d.reject(chrome.runtime.lastError);
                } else {
                    d.resolve(tab);
                }
            });
            return d.promise();
        };

        this.create = function(createProperties){
            /**
             *
             * @method create
             * @return {Deferred Object}
             * @param {Object} createProperties
             * @example
             *     // ex1
             *     chromerred.tabs.create({url: "http://example.org/"})
             *     .then(function(tab){
             *         //
             *     });
             */
            var d = $.Deferred();
            chrome.tabs.create(createProperties, function(tab){
                if (chrome.runtime.lastError !== undefined){
                    d.reject(chrome.runtime.lastError);
                } else {
                    d.resolve(tab);
                }
            });
            return d.promise();
        };

        this.query = function(queryInfo){
            /**
             *
             * @method query
             * @return {Deferred Object}
             * @param {Object} queryInfo
             * @example
             *     // ex1
             *     chromerred.tabs.query({active: true})
             *     .then(function(tabs){
             *         //
             *     });
             */
            var d = $.Deferred();
            chrome.tabs.query(queryInfo, function(tabs){
                if (chrome.runtime.lastError !== undefined){
                    d.reject(chrome.runtime.lastError);
                } else {
                    d.resolve(tabs);
                }
            });
            return d.promise();
        };
    };
};
