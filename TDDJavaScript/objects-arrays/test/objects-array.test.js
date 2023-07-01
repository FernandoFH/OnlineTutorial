const { uniqueKey } = require("../src/libs/objects-array");

test("It's Alive", () => {
    uniqueKey([])
});

test("Input Empty", () => {
    const resultado = uniqueKey([]);
    expect(resultado).toEqual([]);
});

test("Input Objets empty", () => {
    const resultado = uniqueKey([{}]);
    expect(resultado).toEqual([]);
});

test("Input Array 1 key, return key", () => {
    const array  = [{name: "Fernando" }];
    
    const resultado = uniqueKey(array)
    expect(resultado).toEqual(["name"]);
});

test("Input Array 3 keys, return keys", () => {
    const array  = [{name: "Fernando" , surname: "H", age: "34"}];
    
    const resultado = uniqueKey(array)
    expect(resultado).toEqual(["name","surname","age"]);
});

test("Input Array with 2 objecst in diferent keys, return keys", () => {
    const array  = [{name: "Fernando"} , {surname: "H"}];
    const resultado = uniqueKey(array)
    expect(resultado).toEqual(["name","surname"]);
});

test("Input Array with 2 objecst with same keys, return one key", () => {
    const array  = [{name: "Fernando"} , {name: "Push"}];
    const resultado = uniqueKey(array)
    expect(resultado).toEqual(["name"]);
});

test("Input much Array objecst with diferent keys, return uniques keys", () => {
    const array  = [
        {name: "Fernando", surname: "HH", age: 25}, 
        {name: "Push", surname: "xx", Food: "Left"}, 
        {tuki: "Na"}
    ];
    const resultado = uniqueKey(array)
    expect(resultado).toEqual(["name", "surname", "age", "Food", "tuki"]);
});