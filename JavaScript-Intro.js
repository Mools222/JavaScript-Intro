// Write a function arrayToList that builds up a list structure like the one
// shown when given [1, 2, 3] as argument. Also write a listToArray function
// that produces an array from a list. Then add a helper function prepend, which
// takes an element and a list and creates a new list that adds the element to the
// front of the input list, and nth, which takes a list and a number and returns
// the element at the given position in the list (with zero referring to the first
// element) or undefined when there is no such element.
// If you haven’t already, also write a recursive version of nth.
function page80_Eloquent_JavaScript_Exercise_A_List() {
    console.log(arrayToList([10, 20]));
    // → {value: 10, rest: {value: 20, rest: null}}
    console.log(listToArrayRecursion(arrayToList([10, 20, 30])));
    // → [10, 20, 30]
    console.log(listToArrayLoop(arrayToList([10, 20, 30])));
    // → [10, 20, 30]
    console.log(prepend(10, prepend(20, null)));
    // → {value: 10, rest: {value: 20, rest: null}}
    console.log(nth(arrayToList([10, 20, 30]), 1));
    // → 20
}

page80_Eloquent_JavaScript_Exercise_A_List();

function arrayToList(array) {
    let list = {};
    let currentList = list;
    for (let i = 0; i < array.length; i++) {
        currentList.value = array[i];
        currentList.rest = i === array.length - 1 ? null : {};
        currentList = currentList.rest;
    }
    return list;
}

function listToArrayRecursion(object) {
    let array = [];
    recursion(object);

    function recursion(list) {
        array.push(list.value);
        if (list.rest !== null)
            recursion(list.rest)
    }

    return array;
}

function listToArrayLoop(object) {
    let array = [];
    while (object !== null) {
        array.push(object.value);
        object = object.rest;
    }
    return array;
}

function prepend(element, list) {
    return {value: element, rest: list};
}

function nth(list, number) {
    if (list === null)
        return undefined;
    if (number === 0)
        return list.value;
    else
        return nth(list.rest, number - 1);
}

// “Flatten” an array of arrays into a single array that has all the elements of
// the original arrays.
function page95_Eloquent_JavaScript_Exercise_Flattening() {
    let array = [0, [1, 2, 3], [4, 5], [6, [7, [8, 9]]]];
    let flatArray1 = flattenRecursive(array);
    let flatArray2 = flattenLoop(array);

    console.log(flatArray1); // → [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(flatArray2); // → [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

page95_Eloquent_JavaScript_Exercise_Flattening();

function flattenRecursive(array) {
    let flatArray = [];
    for (let element of array) {
        if (Array.isArray(element))
            flatArray = flatArray.concat(flattenRecursive(element));
        else
            flatArray.push(element);
    }
    return flatArray;
}

function flattenLoop(array) {
    let flatArray = [];
    let queue = [array];

    while (queue.length > 0) {
        for (let element of queue[0]) {
            if (Array.isArray(element))
                queue.push(element);
            else
                flatArray.push(element);
        }
        queue.shift();
    }
    return flatArray;
}