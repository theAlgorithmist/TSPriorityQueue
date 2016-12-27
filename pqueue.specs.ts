/** Copyright 2016 Jim Armstrong (www.algorithmist.net)
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

// Specs for various alpha release of Typescript Math Toolkit priority queue
import {Prioritizable     } from './src/Prioritizable';
import {TSMT$PriorityQueue} from './src/PriorityQueue';
import {SortType          } from './src/PriorityQueue';
import {PQUEUE_SORT_ENUM  } from './src/PriorityQueue';

class PItem 
{
  protected _name: string  = "name";
  protected _id: number    = 0;
  protected _value: number = 0;

  constructor()
  {
    // empty
  }

  public get name(): string
  {
    return this._name;
  }

  public get id(): number
  {
    return this._id;
  }

  public get value(): number
  {
    return this._value;
  }

  // mutators removed to save space

  public computeValue(someData: Object): void
  {
    // compute value from supplied data
  }
}

// Test Suites
describe('TSMT Priority Queue', () => {
  let __pObject: Prioritizable<Object>     = new Prioritizable<Object>(Object);
  let __pqueue: TSMT$PriorityQueue<Object> = new TSMT$PriorityQueue<Object>();

  it('constructs prioritizable object and queue properly', function() {
    expect(__pObject !== null).toBeTruthy();
    expect(__pqueue !== null).toBeTruthy();

    expect(__pObject.priority).toBe(0);
    expect(__pObject.timestamp).toBe(0);
  });

  it('prioritizable object accepts and returns data', function() {
    __pObject.data    = {a:1, b:-1};
    let result:Object = __pObject.data;

    expect(+result['a']).toBe(1);
    expect(+result['b']).toBe(-1);
    expect(Object.keys(result).length).toBe(2);
  });

  it('prioritizable object works with class', function() {
    let item: Prioritizable<PItem> = new Prioritizable<PItem>(PItem);
    let pItem: PItem               = item.data;

    item.priority    = 1;
    item.timestamp   = 1001;
 
    expect(item.priority).toBe(1);
    expect(item.timestamp).toBe(1001);
    expect(pItem.value).toBe(0);
  });

  it('prioritizable object works with no constructor argument', function() {
    let item: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem: PItem               = new PItem();

    item.priority  = 1;
    item.timestamp = 1001;
    item.data      = pItem;

    let result: PItem = item.data;

    expect(item.priority).toBe(1);
    expect(item.timestamp).toBe(1001);
    expect(result.value).toBe(0);
  });

  it('returns zero for the length of a constructed, but uniinitialized priority queue', function() {
    expect(__pqueue.length).toBe(0);
  });

  it('accepts an array of prioritizable data as input', function() {
    let item1: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem1: PItem               = new PItem();

    item1.priority  = 1;
    item1.timestamp = 1001;
    item1.data      = pItem1;

    let item2: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem2: PItem               = new PItem();

    item2.priority  = 1;
    item2.timestamp = 1200;
    item2.data      = pItem2;

    let item3: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem3: PItem               = new PItem();

    item3.priority  = 4;
    item3.timestamp = 1877;
    item3.data      = pItem3;

    let queue: TSMT$PriorityQueue<PItem> = new TSMT$PriorityQueue<PItem>();
    queue.data = [item1, item2, item3];

    expect(queue.length).toBe(3);
  });

  it('priority queue rejects invalid sort criteria', function() {
    let z:any = 'z';

    // note that this would cause a compile error
    // __pqueue.sortCriteria = ['priority', 'z'];
    __pqueue.sortCriteria = ['p', z];

    let c: Array<SortType> = __pqueue.sortCriteria;
    expect(c.length).toBe(0);
  });

  it('adds individual items to the priority queue, while rejecing null additions', function() {
    let item1: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem1: PItem               = new PItem();

    item1.priority  = 1;
    item1.timestamp = 1001;
    item1.data      = pItem1;

    let item2: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem2: PItem               = new PItem();

    item2.priority  = 1;
    item2.timestamp = 1200;
    item2.data      = pItem2;

    let item3: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem3: PItem               = new PItem();

    item3.priority  = 4;
    item3.timestamp = 1877;
    item3.data      = pItem3;

    let queue: TSMT$PriorityQueue<PItem> = new TSMT$PriorityQueue<PItem>();
    
    let badItem: any = null;

    queue.addItem(item1);
    queue.addItem(item2);
    queue.addItem(item3);
    queue.addItem(badItem);

    expect(queue.length).toBe(3);
  });

   it('returns correct boolean values when attempting to remove an item from the queue', function() {
    let item1: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem1: PItem               = new PItem();

    item1.priority  = 1;
    item1.timestamp = 1001;
    item1.data      = pItem1;

    let item2: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem2: PItem               = new PItem();

    item2.priority  = 1;
    item2.timestamp = 1200;
    item2.data      = pItem2;

    let item3: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem3: PItem               = new PItem();

    item3.priority  = 4;
    item3.timestamp = 1877;
    item3.data      = pItem3;

    let queue: TSMT$PriorityQueue<PItem> = new TSMT$PriorityQueue<PItem>();

    queue.addItem(item1);
    queue.addItem(item2);
    queue.addItem(item3);

    let item4: Prioritizable<PItem> = new Prioritizable<PItem>();
    let pItem4: PItem               = new PItem();

    item4.priority  = 12;
    item4.timestamp = 2001;
    item4.data      = pItem4;

    expect(queue.length).toBe(3);

    let removed: boolean = queue.removeItem(item4);
    expect(removed).toBeFalsy();

    removed = queue.removeItem(item1);
    expect(removed).toBeTruthy();
    expect(queue.length).toBe(2);
  });

  it('properly maintains sorted order for queue of objects', function() {
    __pqueue.clear();
   
    let item1:  Prioritizable<Object> = new Prioritizable<Object>();
    let item2:  Prioritizable<Object> = new Prioritizable<Object>();
    let item3:  Prioritizable<Object> = new Prioritizable<Object>();
    let item4:  Prioritizable<Object> = new Prioritizable<Object>();
    let item5:  Prioritizable<Object> = new Prioritizable<Object>();
    let item6:  Prioritizable<Object> = new Prioritizable<Object>();
    let item7:  Prioritizable<Object> = new Prioritizable<Object>();
    let item8:  Prioritizable<Object> = new Prioritizable<Object>();
    let item9:  Prioritizable<Object> = new Prioritizable<Object>();
    let item10: Prioritizable<Object> = new Prioritizable<Object>();
    let item11: Prioritizable<Object> = new Prioritizable<Object>();
    let item12: Prioritizable<Object> = new Prioritizable<Object>();
    let item13: Prioritizable<Object> = new Prioritizable<Object>();

    item1.priority = 3;
    item1.data     = {value:100};

    item2.priority = 1;
    item2.data    = {value:50};

    item3.priority = 20;
    item3.data     = {value:0};

    item4.priority = 18;
    item4.data     = {value:1};

    item5.priority = 2;
    item5.data     = {value:75};

    item6.priority = 1;
    item6.data     = {value:75};

    item7.priority = 1;
    item7.data     = {value:100};

    item8.priority = 7;
    item8.data     = {value:30};

    item9.priority = 10;
    item9.data     = {value:35};

    item10.priority = 11;
    item10.data     = {value:35};

    item11.priority = 5;
    item11.data     = {value:100};

    item12.priority = 4;
    item12.data     = {value:75};

    item13.priority = 3;
    item13.data     = {value:50};

    // a complete sort is done by default on every addition.
    __pqueue.addItem(item1);
    __pqueue.addItem(item2);
    __pqueue.addItem(item3);
    __pqueue.addItem(item4);
    __pqueue.addItem(item5);
    __pqueue.addItem(item6);
    __pqueue.addItem(item7);
    __pqueue.addItem(item8);
    __pqueue.addItem(item9);
    __pqueue.addItem(item10);
    __pqueue.addItem(item11);
    __pqueue.addItem(item12);
    __pqueue.addItem(item13);

    expect(__pqueue.length).toBe(13);

    // the first three items in the queue should have priority 1
    let item:Prioritizable<Object> = __pqueue.removeFirstItem();
    expect(item.priority).toBe(1);

    item = __pqueue.removeLastItem();
    expect(item.priority).toBe(20);
    expect(__pqueue.length).toBe(11);
  });

  it('properly maintains sorted order for both priority and timestamp', function() {
    __pqueue.clear();
   
    let item1:  Prioritizable<Object> = new Prioritizable<Object>();
    let item2:  Prioritizable<Object> = new Prioritizable<Object>();
    let item3:  Prioritizable<Object> = new Prioritizable<Object>();
    let item4:  Prioritizable<Object> = new Prioritizable<Object>();
    let item5:  Prioritizable<Object> = new Prioritizable<Object>();
    let item6:  Prioritizable<Object> = new Prioritizable<Object>();
    let item7:  Prioritizable<Object> = new Prioritizable<Object>();
    let item8:  Prioritizable<Object> = new Prioritizable<Object>();
    let item9:  Prioritizable<Object> = new Prioritizable<Object>();
    let item10: Prioritizable<Object> = new Prioritizable<Object>();
    let item11: Prioritizable<Object> = new Prioritizable<Object>();
    let item12: Prioritizable<Object> = new Prioritizable<Object>();
    let item13: Prioritizable<Object> = new Prioritizable<Object>();

    item1.priority  = 3;
    item1.timestamp = 1000;
    item1.data      = {value:100};

    item2.priority  = 1;
    item2.timestamp = 1010;
    item2.data      = {value:50};

    item3.priority  = 20;
    item3.timestamp = 1020;
    item3.data      = {value:0};

    item4.priority  = 18;
    item4.timestamp = 1030;
    item4.data      = {value:1};

    item5.priority  = 2;
    item5.timestamp = 1040;
    item5.data      = {value:75};

    item6.priority  = 1;
    item6.timestamp = 1050;
    item6.data      = {value:75};

    item7.priority  = 1;
    item7.timestamp = 1060;
    item7.data      = {value:100};

    item8.priority  = 7;
    item8.timestamp = 1070;
    item8.data      = {value:30};

    item9.priority  = 10;
    item9.timestamp = 1080;
    item9.data      = {value:35};

    item10.priority  = 11;
    item10.timestamp = 1090;
    item10.data      = {value:35};

    item11.priority  = 5;
    item11.timestamp = 1100;
    item11.data      = {value:100};

    item12.priority  = 4;
    item12.timestamp = 1110;
    item12.data      = {value:75};

    item13.priority  = 3;
    item13.timestamp = 1120;
    item13.data      = {value:50};

    // set the sort criteria - priority first (ties in priority broken by timestamp)
    __pqueue.sortCriteria = [ PQUEUE_SORT_ENUM['PRIORITY'], PQUEUE_SORT_ENUM['TIMESTAMP'] ];

    // delay the sort until an operation where queue items are to be fetched
    __pqueue.delay = true;

    __pqueue.addItem(item1);
    __pqueue.addItem(item2);
    __pqueue.addItem(item3);
    __pqueue.addItem(item4);
    __pqueue.addItem(item5);
    __pqueue.addItem(item6);
    __pqueue.addItem(item7);
    __pqueue.addItem(item8);
    __pqueue.addItem(item9);
    __pqueue.addItem(item10);
    __pqueue.addItem(item11);
    __pqueue.addItem(item12);
    __pqueue.addItem(item13);

    __pqueue.delay = false;

    expect(__pqueue.length).toBe(13);

    // now, we should have an unambigouous ordering since the timestamps are supposed to be unique
    let item:Prioritizable<Object> = __pqueue.removeFirstItem();
    expect(item.priority).toBe(1);
    expect(item.timestamp).toBe(1010);

    item = __pqueue.removeFirstItem();
    expect(item.priority).toBe(1);
    expect(item.timestamp).toBe(1050);


    //expect(__pqueue.length).toBe(0);
  });
});
