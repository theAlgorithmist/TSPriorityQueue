/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PQUEUE_SORT_ENUM, TSMT$PriorityQueue;
    return {
        setters:[],
        execute: function() {
            // the values MUST match the named accessors in a Prioritizable<T> class
            exports_1("PQUEUE_SORT_ENUM", PQUEUE_SORT_ENUM = {
                'PRIORITY': 'priority',
                'TIMESTAMP': 'timestamp'
            });
            TSMT$PriorityQueue = (function () {
                function TSMT$PriorityQueue() {
                    this._delay = true; // true if sorting is delay while adding items to the priority queue
                    this._invalidated = true; // true if additions to the queue have invalidated the sorting order
                    // the priority queue is sorted only by priority, by default; you may change the default behavior simply by changing this array
                    this._defaultCriteria = [PQUEUE_SORT_ENUM['PRIORITY']];
                    this._queue = new Array();
                    this._sortCriteria = new Array();
                }
                Object.defineProperty(TSMT$PriorityQueue.prototype, "length", {
                    /**
                       * Access the length of the priority queue
                       *
                       * @return number - length of the priority queue
                       */
                    get: function () {
                        return this._queue ? this._queue.length : 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TSMT$PriorityQueue.prototype, "delay", {
                    /**
                     * Access the current sort-delay parameter
                     *
                     * @return Boolean - Value of sort-delay parameter
                     */
                    get: function () {
                        return this._delay;
                    },
                    /**
                     * Assign the sort-delay parameter
                     *
                     * @param value : boolean - true if sorting is delayed while adding items to the priority queue (for performance reasons)
                     *
                     * @return Nothing
                     */
                    set: function (value) {
                        this._delay = value === true ? true : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TSMT$PriorityQueue.prototype, "sortCriteria", {
                    /**
                     * Access the current sort criteria
                     *
                     */
                    get: function () {
                        return this._sortCriteria.slice();
                    },
                    /**
                     * Assign the sort criteria for this priority queue
                     *
                     * @param crietria : Array<SortType> - Each element of the array must correspond to a property PQUEUE_SORT_ENUM
                     *
                     * @return Nothing - Assign the sort criteria.  The priority queue is sorted according to the first criteria, then equal values are sorted relative to the second criteria, and so on.
                     */
                    set: function (criteria) {
                        if (criteria && criteria.length) {
                            var len = criteria.length;
                            if (len > 0) {
                                var i = void 0;
                                var valid = true;
                                var values = Object.values(PQUEUE_SORT_ENUM); // could be more efficient, but the mutator is not called often and typically only with a couple values
                                for (i = 0; i < len; ++i) {
                                    valid = valid && this.__isSortType(criteria[i], values);
                                }
                                if (valid)
                                    this._sortCriteria = criteria.slice();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TSMT$PriorityQueue.prototype, "data", {
                    /**
                       * Assign data to the queue
                       *
                       * @param data : Array< Prioritizable<T> > - Array of Prioritizable items of specified type
                       *
                       * @return Nothing
                       */
                    set: function (value) {
                        if (value && value.length > 0)
                            this._queue = value.slice();
                    },
                    enumerable: true,
                    configurable: true
                });
                // (type guard) check if a supplied value is a legal sort type - returns type predicate 
                TSMT$PriorityQueue.prototype.__isSortType = function (value, acceptable) {
                    var len = acceptable.length;
                    var i;
                    return acceptable.indexOf(value) != -1;
                };
                /**
                   * Add an item to the priority queue
                   *
                   * @param item : Prioritizable<T> - Item to add to the priority queue
                   *
                   * @return Nothing - The item is added to the end of queue and the queue is automatically re-sorted if the sort-delay is false.  Otherwise, the queue is sorted according the currently
                   * assigned sort criteria
                   */
                TSMT$PriorityQueue.prototype.addItem = function (item) {
                    // tbd - add type guard??
                    if (item) {
                        this._queue.push(item);
                        if (!this._delay)
                            this.__sort();
                        else
                            this._invalidated = true;
                    }
                };
                /**
                 * Return the first and highest priority item
                 *
                 * @return Prioritizable<T> - Highest priority (topmost) queue item.  The item is permanently removed from the priority queue.  Return will be null if there is no data in the queue
                 *
                 */
                TSMT$PriorityQueue.prototype.removeFirstItem = function () {
                    if (this._queue.length == 0)
                        return null;
                    if (this._invalidated)
                        this.__sort();
                    return this._queue.shift();
                };
                /**
                 * Return the last and lowest priority item
                 *
                 * @return Prioritizable<T> - Lowest priority (bottommost) queue item.  The item is permanently removed from the priority queue.  Return will be null if there is no data in the queue
                 *
                 */
                TSMT$PriorityQueue.prototype.removeLastItem = function () {
                    if (this._queue.length == 0)
                        return null;
                    if (this._invalidated)
                        this.__sort();
                    return this._queue.pop();
                };
                /**
                 * Remove the specified item from the priority queue or take no action if the item does not exist
                 *
                 * @param item : Prioritizable<T> - Item to be removed
                 *
                 * @return Boolean - true if the item was found and removed from the queue.  The queue is resorted unless the delay parameter is false.  This allows multiple
                 * removals to be processed faster and only perform a single sort, JIT.
                 */
                TSMT$PriorityQueue.prototype.removeItem = function (item) {
                    if (item == undefined || item == null)
                        return false;
                    var index = this.__getItemIndex(item);
                    if (index != -1) {
                        this._queue.splice(index, 1);
                        return true;
                    }
                    return false;
                };
                /**
                 * Clear the priority queue and prepare for new data
                   *
                 * @return Nothing - The priority queue is prepared for new data; all parameters are reset to default settings
                 */
                TSMT$PriorityQueue.prototype.clear = function () {
                    this._queue.length = 0;
                    this._sortCriteria.length = 0;
                    this._invalidated = true;
                    this._delay = false;
                };
                // internal method - get the index corresponding to the input item
                TSMT$PriorityQueue.prototype.__getItemIndex = function (item) {
                    var len = this._queue.length;
                    var i;
                    for (i = 0; i < len; ++i) {
                        if (this._queue[i] === item)
                            return i;
                    }
                    return -1;
                };
                // sort on user-supplied criteria based on allowable properties for a Prioritizable<T>
                TSMT$PriorityQueue.prototype.__sort = function () {
                    if (this._queue.length < 2)
                        return;
                    if (this._sortCriteria.length == 0)
                        this._sortCriteria = this._defaultCriteria.slice();
                    // sort-on multiple criteria       
                    var args = this._sortCriteria.slice();
                    this._queue.sort(function (a, b) {
                        var props = args.slice();
                        var prop = props.shift();
                        while (a[prop] == b[prop] && props.length)
                            prop = props.shift();
                        // we expect things like priority and timestamp (or related data) to be integral (i.e. a straight equality test is acceptable)
                        return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
                    });
                    this._invalidated = false;
                };
                return TSMT$PriorityQueue;
            }());
            exports_1("TSMT$PriorityQueue", TSMT$PriorityQueue);
        }
    }
});
//# sourceMappingURL=PriorityQueue.js.map