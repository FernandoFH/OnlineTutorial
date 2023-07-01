/*
Input:
[
    {name: "Fernando", surname: "H"}
    {food: "Tupac", surname: "Kaka"}
]

Output: 
[name,surname,food]
*/
// De un array encontrar claves unicas 

/*
// Original 
const uniqueKey = (array) => {
   if (array.length === 0){
        return [];
    }
    if (array.length === 1){
        const element = array[0];
        const key = Object.keys(element);
        return key;
    }

    const uniqueKeys = new Set(); 
    for(const element of array){
        const keys = Object.keys(element);
        for (const key of keys) {
            uniqueKeys.add(key)
        }
    }
    return [...uniqueKeys];
};*/

// Refacts 
const uniqueKey = (array) => {
    const arrayOfKeys = array.map((element) => Object.keys(element));
    const uniqueKeys = [].concat(...arrayOfKeys);
    const uniqueKeysSet = new Set(uniqueKeys);
    return [...uniqueKeysSet];
};


module.exports = { uniqueKey }