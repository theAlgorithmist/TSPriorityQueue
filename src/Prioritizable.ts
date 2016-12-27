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
import {IPrioritizable} from './IPrioritizable';

/**
 * A concrete implementation of the IPrioritizable<T> interface that serves as a base for any prioritizable item to be placed into the Typescript Math Toolkit Priority queue
 * 
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */
export class Prioritizable<T> implements IPrioritizable<T>
{
  protected _priority: number;
  protected _timestamp: number;
  
  protected _data: T;

/**
 * Construct a new Prioritizable item
 * 
 * @param TConstructor : { new (): T }  (optional) Reference to a constructable object
 * 
 * @return Nothing Constructs the supplied data type (if provided) and sets the internal data reference.  Priority and timestamp are initialized to zero.
 */
  constructor( TConstructor?: { new (): T } )
  {
    this._priority  = 0;
    this._timestamp = 0;

    // pre-construct the data type?
    if (TConstructor)
      this._data = new TConstructor();
  }

/**
 * Access the priority
 * 
 * @return number Current priority value
 */
  public get priority(): number
  {
    return this._priority;
  }

/**
 * Assign the priority
 * 
 * @param value: number Priority value (must be greater than or equal to zero) - expected to be integer, but this is not currently enforced
 * 
 * @return Nothing Assigns the priority if the input is a valid number
 */
  public set priority(value: number)
  {
    if (!isNaN(value) && value === value && value >= 0)
      this._priority = value;
  }

/**
 * Access the timestamp value
 * 
 * @return number Current timestamp value
 */
  public get timestamp(): number
  {
    return this._timestamp;
  }

/**
 * Assign the timestamp value
 * 
 * @param value: number Timestamp value (must be greater than or equal to zero) - expected to be integer, but this is not currently enforced
 * 
 * @return Nothing Assigns the timestamp if the input is a valid number
 */
  public set timestamp(value: number)
  {
    if (!isNaN(value) && value === value && value >= 0)
      this._timestamp = value;
  }

/**
 * Access the data item
 * 
 * @return T Direct reference to the data item; the data is not currently required to be cloneable, so a direct reference is provided.  Use this method with caution.
 */
  public get data(): T
  {
    return this._data;
  }

/**
 * Assign the data item
 * 
 * @param value: T Reference to a data value of type T
 * 
 * @return Nothing Directly assigns the supplied reference to the internal data value.  Use caution to not make further modifications to the supplied value.
 */
  public set data(value: T)
  {
    if (value)
      this._data = value;
  }
}