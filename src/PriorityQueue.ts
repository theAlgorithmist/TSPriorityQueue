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

/**
 * Typescript Math Toolkit: Minimal implementation of a priority queue. 
 *
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */

 import {Prioritizable} from './Prioritizable';

 // the values MUST match the named accessors in a Prioritizable<T> class
 export const PQUEUE_SORT_ENUM: Object = 
 {
	 'PRIORITY' : 'priority',
	 'TIMESTAMP': 'timestamp'
 }

 export type SortType = 'priority' | 'timestamp';

 export class TSMT$PriorityQueue<T>
 {
   protected _queue: Array< Prioritizable<T> >;                // The actual priority queue
   protected _sortCriteria: Array<SortType>;                   // user-supplied sort criteria
   protected _delay: boolean               = true;             // true if sorting is delay while adding items to the priority queue
   protected _invalidated: boolean         = true;             // true if additions to the queue have invalidated the sorting order

   // the priority queue is sorted only by priority, by default; you may change the default behavior simply by changing this array
	 protected _defaultCriteria = [ PQUEUE_SORT_ENUM['PRIORITY'] ];

   constructor()
   {
		 this._queue        = new Array< Prioritizable<T> >();
     this._sortCriteria = new Array<SortType>();
   }

  /**
	 * Access the length of the priority queue
	 * 
	 * @return number - length of the priority queue
	 */
	 public get length(): number
	 {
	   return this._queue ? this._queue.length : 0;
   }

  /**
   * Access the current sort-delay parameter
   * 
   * @return Boolean - Value of sort-delay parameter
   */
   public get delay(): boolean
   {
	   return this._delay;
   }

 /**
  * Access the current sort criteria
  * 
  */
  public get sortCriteria(): Array<SortType>
	{
    return this._sortCriteria.slice();
	}

  /**
   * Assign the sort-delay parameter
   * 
   * @param value : boolean - true if sorting is delayed while adding items to the priority queue (for performance reasons)
   * 
   * @return Nothing
   */
   public set delay(value: boolean)
   {     
     this._delay = value === true ? true : false;
   }

  /**
	 * Assign data to the queue
	 * 
	 * @param data : Array< Prioritizable<T> > - Array of Prioritizable items of specified type
	 * 
	 * @return Nothing
	 */
	 public set data(value: Array< Prioritizable<T> > )
	 {
	   if (value && value.length > 0)
	     this._queue = value.slice()
	 }

  /**
   * Assign the sort criteria for this priority queue
   * 
   * @param crietria : Array<SortType> - Each element of the array must correspond to a property PQUEUE_SORT_ENUM 
   * 
   * @return Nothing - Assign the sort criteria.  The priority queue is sorted according to the first criteria, then equal values are sorted relative to the second criteria, and so on.
   */
   public set sortCriteria(criteria: Array<SortType>)
   {
     if( criteria && criteria.length )
		 {
			 const len: number = criteria.length;
			 if (len > 0)
			 {
	       let i: number;
				 let valid: boolean        = true;
				 let values: Array<string> = Object.values(PQUEUE_SORT_ENUM); // could be more efficient, but the mutator is not called often and typically only with a couple values

				 for (i=0; i<len; ++i)
				 {
           valid = valid && this.__isSortType(criteria[i], values);
				 }

         if (valid)
			     this._sortCriteria = criteria.slice();
			 }
		 }
   }

   // (type guard) check if a supplied value is a legal sort type - returns type predicate 
   protected __isSortType(value: string, acceptable: Array<string>): value is SortType
	 {
     let len = acceptable.length;
		 let i: number;

     return acceptable.indexOf(value) != -1;
	 }

  /**
	 * Add an item to the priority queue
	 * 
	 * @param item : Prioritizable<T> - Item to add to the priority queue
	 * 
	 * @return Nothing - The item is added to the end of queue and the queue is automatically re-sorted if the sort-delay is false.  Otherwise, the queue is sorted according the currently
	 * assigned sort criteria
	 */
   public addItem(item: Prioritizable<T>): void
   {
		 // tbd - add type guard??
	   if (item)
     {
       this._queue.push(item);
			    
       if (!this._delay)
         this.__sort();
       else
         this._invalidated = true;
     }
   }

  /**
   * Return the first and highest priority item 
   *  
   * @return Prioritizable<T> - Highest priority (topmost) queue item.  The item is permanently removed from the priority queue.  Return will be null if there is no data in the queue
   * 
   */		
   public removeFirstItem(): Prioritizable<T> 
	 {
		 if (this._queue.length == 0)
		   return null;

     if (this._invalidated)
       this.__sort();
        
     return this._queue.shift();
   }

  /**
   * Return the last and lowest priority item 
   *  
   * @return Prioritizable<T> - Lowest priority (bottommost) queue item.  The item is permanently removed from the priority queue.  Return will be null if there is no data in the queue
   * 
   */    
	 public removeLastItem(): Prioritizable<T>
	 {
		 if (this._queue.length == 0)
		   return null;

	   if (this._invalidated)
	     this.__sort();
	        
	    return this._queue.pop();
   }

  /**
   * Remove the specified item from the priority queue or take no action if the item does not exist
   * 
   * @param item : Prioritizable<T> - Item to be removed
   * 
   * @return Boolean - true if the item was found and removed from the queue.  The queue is resorted unless the delay parameter is false.  This allows multiple
   * removals to be processed faster and only perform a single sort, JIT.
   */
   public removeItem(item: Prioritizable<T>): boolean
   {
     if (item == undefined || item == null)
       return false;
        
     let index: number = this.__getItemIndex(item);
			
     if (index != -1)
     {
       this._queue.splice(index, 1);
	     return true;
     }
			  
     return false;
   }

  /**
   * Clear the priority queue and prepare for new data
	 *  
   * @return Nothing - The priority queue is prepared for new data; all parameters are reset to default settings
   */
   public clear(): void
   {
     this._queue.length        = 0;
     this._sortCriteria.length = 0;
     this._invalidated         = true;
		 this._delay               = false;
   }
	 
	 // internal method - get the index corresponding to the input item
	 protected __getItemIndex(item: Prioritizable<T>): number
   {
     const len: number = this._queue.length;
     let i: number;
     for (i = 0; i<len; ++i)
	   {
	     if (this._queue[i] === item)
	       return i;
     }
        
     return -1;
   }

	 // sort on user-supplied criteria based on allowable properties for a Prioritizable<T>
   protected __sort(): void
   {
		 if (this._queue.length < 2)
		   return;

     if (this._sortCriteria.length == 0)
       this._sortCriteria = this._defaultCriteria.slice();
      
     // sort-on multiple criteria       
     const args: Array<SortType> = this._sortCriteria.slice();

     this._queue.sort
		 (
       (a: Prioritizable<T>, b: Prioritizable<T>): number => {
         let props: Array<string> = args.slice();
         let prop: string         = props.shift();
            
         while (a[prop] == b[prop] && props.length) 
           prop = props.shift();
              
	       // we expect things like priority and timestamp (or related data) to be integral (i.e. a straight equality test is acceptable)
         return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
       }
     );

     this._invalidated = false;
   }
 }