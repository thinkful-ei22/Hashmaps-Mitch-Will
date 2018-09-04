'use strict';

import { linkedlist } from './linked-list';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      //throw new Error('Key error');
      return undefined;
    }
    return this._slots[index].find(key);
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    if(!this._slots[index]){
        this._slots[index] = new linkedlist();
        this._slots[index].insertFirst({ key, value, deleted:false })
        this.length++;
    } else {
        this._slots[index].insertLast({key, value, deleted: false})
        this.length++;
    }
    // this._slots[index] = {
    //   key,
    //   value,
    //   deleted: false
    // };
    // this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const index = hash % this._capacity;
    return index;
    // for (let i=start; i<start + this._capacity; i++) {
    //   const index = i % this._capacity;

    //   const slot = this._slots[index];
    //   if (slot === undefined || (slot.key === key && !slot.deleted)) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

// function isPalindrome(str){
//     let hash = new HashMap();
//     str = str.split('');
//     while(str[0]){
//         let character = str.pop();
//        try(hash.get(charater)) 

//     }
// }