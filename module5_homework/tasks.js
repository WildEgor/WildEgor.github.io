// Task #1
let result = +prompt('Enter a number');

if (typeof result !== "number" || isNaN(result)) {
    console.log('Oupss, perhaps, you have entered smth wrong dude...');
} else {
    result%2 == 1? console.log('Odd') : console.log('Even');
}

// Task #2
result = 2;

console.log(typeof result);

if (typeof result !== "number" || isNaN(result)) {
    if (typeof result === "boolean") {
        console.log("X - is Boolean");
    } else {
        console.log("X - is String");
    }
} else {
    console.log("X - is Number");
}

// Task #3
let myString = 'Hello';
let buf = [];

for (let i = [...myString].length; i >= 0; i--) {
    buf.push([...myString][i]);
}

console.log(myString.split('').reverse().join(''))
console.log(buf.join(''));

// Task #4
let randValue = Math.floor(Math.random()*100);
console.log(randValue);

// Task #5
let randArr = [1, 3, 44, 23];

console.log(`Array size is ${randArr.length}`);

randArr.forEach(item => {
    console.log(item);
})

for (let i = 0; i < randArr.length; i++) {
    console.log(randArr[i]);
}

// Task #6
let newArr = [1, 1, 1, 1, 1]

const reducer = (previousValue, currentValue) => {
    return previousValue == currentValue;
};

console.log(newArr.reduce(reducer));

// Task #7
let someArr = [1, 'a', '3', 44, 2, 0, 0, null, true, 'a'];

let resArr = [0, 0, 0, 0]

someArr.forEach(item => {
    if (typeof item == 'number') {
        if (item == 0) {
            resArr[0]++
        } else {
            item%2 == 1? resArr[1]++ : resArr[2]++;
        }
    } else {
        resArr[3]++
    }
})

console.log(`Counter: zero(${resArr[0]}), odd(${resArr[1]}), even(${resArr[2]}) and other(${resArr[3]})`);

// Task #8
let fruits = new Map([
    ["apple", "green"],
    ["strawberry", "red"],
    ["blueberry",    "blue"]
]);

fruits.forEach((value, key, map) => {
    console.log(`Key - ${key}, value - ${value}`); 
});




