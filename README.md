# Typescript Math Toolkit Priority Queue

This is the alpha release of the Typescript Math Toolkit Priority Queue.  As I have mentioned in other projects, the TSMT Data Structures library is intended to provided a necessary set of structures to support algorithms in the toolkit and corresponding demos.  I am placing the structures one-at-a-time into the public domain for purposes of additional testing and API feedback.

As with other structures in the library, this one has a long history that dates back to some old 1990's C++ code that was eventually ported to Actionscript (at which point templatized data was removed) for use in Flex applications.  Now that Typescript provides Generics, I have an opportunity to provide a more direct port of the original C++ code.


Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Typescript: 2.0.0

Version: 1.0.0


## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)


### Building and Running the unit tests

1. gulp compile

2. gulp serve

The test suite is in Jasmine.  The priority queue is in the _src_ folder. 


### Using the priority queue

General usage is based on how I've use the Priority Queue for years and years ... and years :)  The queue is based on the concept of a _Prioritizable_ item, which consists of a numerical (ideally integer) priority, an optional timestamp (numerical value, usually integer), and a reference to a data object of arbitrary type.  See the _IPrioritizable<T>_ interface,

```
export interface IPrioritizable<T>
{
  priority: Number;     // priority, integer>= 0
  timestamp: Number;    // optional timestamp, expected to be an integer >= 0
  data: T;              // arbitrary, but constructable data type such as Object or a Class
} 
```

Although the data is generic, practical usage involves an Object or Class.

A _Prioritizable<T>_ class is provided to create prioritizable items.  Typically, the data is created externally to the prioritizable item and the reference to the data is assigned using a mutator.  I talked to a couple devs who wanted the ability to have the generic data constructed at the same time the _Prioritizable<T>_ class is constructed.  Since type information is discarded on compiliation to Javascript, this is a bit problematic.  One solution is to require the data to be constructable (Object or Class).  Thus, the syntax for the constructor is somewhat unusual,

```
export class Prioritizable<T> implements IPrioritizable<T>
.
.
.
constructor( TConstructor?: { new (): T } )
```

This allows an optional reference to a constructable object to be passed.  If present, the data type is constructed and the internal reference is set during construction of the prioritizable item.

Examples:

- let __pObject: Prioritizable<Object> = new Prioritizable<Object>(Object);   (creates new prioritizable item with Object data, constructs a new Object, and sets the internal data reference)

- let __pObject: Prioritizable<Object> = new Prioritizable<Object>();   (creates new prioritizable item with Object data; internal data reference is null and must be set later using mutator)

I'm not sure I buy into the former use case, but if developers want something, I'm inclined to at least give it a try :)  Understand that this implementation is experiemntal and this feature may be removed in the future.

The more typical use case is to create prioritizable items and their corresponding data classes.  Set the _data_ reference in the prioritizable item and then add to the priority queue.

Example (preseume the availability of a class, PItem):

```
let queue: TSMT$PriorityQueue<PItem> = new TSMT$PriorityQueue<PItem>();
let item1: Prioritizable<PItem>      = new Prioritizable<PItem>();
let pItem1: PItem                    = new PItem();

item1.priority  = 1;
item1.timestamp = 1001;
item1.data      = pItem1;

.
.
.

queue.addItem(item1);
```

By default, the priority queue is sorted in increasing order of priority.  The _timestamp_ property of the prioritizable item may be used as a secondary sort key so that items of equal priority are further sorted in order of increasing _timestamp_ value.  Set the sort criteria as follows for this use case:

```
queue.sortCriteria = [ PQUEUE_SORT_ENUM['PRIORITY'], PQUEUE_SORT_ENUM['TIMESTAMP'] ];
```

In many cases, several items are added to the priority queue at once.  It is possible to tell the queue to delay sorting by using the _delay_ mutator (set to true).  The TSMT Priority Queue uses lazy validation, so a single (multicriteria) sort is performed just-in-time when calling any method that requires the priority queue to be ordered.

Refer to the specs in _pqueue.specs.ts_ for additional usage examples.

Note that some of the API is experimental and subject to future modification.

For more information on the internals of the TSMT Priority Queue, [refer to this blog post].


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>

[refer to this blog post]: <http://www.algorithmist.net/programming/typescript-generics-and-the-typescript-math-toolkit-priority-queue/>
