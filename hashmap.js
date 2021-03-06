'use strict';
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
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
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
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
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

const lor = new HashMap();
lor.set('Hobbit1', 'Bilbo');
lor.set('Hobbit2', 'Frodo');
lor.set('Wizard', 'Gandolf');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar', 'Sauron');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');
//console.log(lor);
//console.log(lor.get('Maiar'));
//console.log(lor);


//PALINDROME

function palindromeCheck(str){
  let hash = new HashMap();
  hash.set(str[0], 1);
  for(let i=1; i < str.length; i++){
    // console.log(hash.get(str[i]));

    try{hash.set(str[i], hash.get(str[i]) + 1 );
    } catch(error){

      hash.set(str[i], 1);
    }
    // if(hash.get(str[i])){
    //   hash.set(str[i], 1);
    // }
   
    // hash.set(str[i], hash.get(str[i]) + 1 );
  }
  // console.log(hash);
  // console.log(hash._slots.length);

  let single = 0;
  for(let j=0; j < hash._slots.length; j++){
  //console.log(hash._slots[i]);
    //.value on line 127 threw error
    if(hash._slots[j] !== undefined){
     
      if(hash._slots[j].value % 2 !== 0){ 
        //console.log(hash._slots[j].value);
        single++;
      }
    
    }
  }
  console.log(single);
  if( single <= 1 ){
    return true;
  }
  return false;
}

//console.log(palindromeCheck('rraceca'));
// console.log(palindromeCheck('rraceca'));
// console.log(palindromeCheck('rxfaceca'));
//hash.get(strings[i].split('').sort())

function anagram(strings){
  let hash = new HashMap();
  for(let i = 0; i < strings.length; i++){
  
    const key = strings[i].split('').sort().join('');
    try {  
     
      const variations = hash.get(key);
      //**** */
      variations.push(strings[i]);
      hash.set(key, variations);

    } catch(error) {
      //console.log(new)
  
      hash.set(key, [strings[i]]);
    }

  }
  //console.log(hash._slots);
  for(let i=0; i < hash._slots.length; i++){
    if(hash._slots[i] !== undefined){
      console.log(hash._slots[i].value);
    }
  }
}



//anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);