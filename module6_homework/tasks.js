// Task #1
let someArr = [1, 'a', '3', 44, 2, 0, 0, null, true, 'a'];
let resArr = new Map (
    [
        ['zero', 0],
        ['odd', 0],
        ['even', 0],
        ['other', 0]
    ]
)

const countElemTypes = (elem, type, counter) => {
    let newCounter = counter;

    if (typeof elem == 'number') {
        switch (type) {
            case ('zero'): 
                elem == 0? newCounter++ : null 
                break;
            case ('odd'): 
                elem%2 == 1? newCounter++ : null
                break;
            case ('even'): 
                elem%2 !== 1? newCounter++ : null
                break;
        }
    } else {
        if (type == 'other') 
        newCounter++;
    }

    return newCounter
}

someArr.forEach(item => {
    resArr.forEach((value, key, myMap) => {
        myMap.set(key, countElemTypes(item, key, value))
    })
})

resArr.forEach((value, key) => {
    console.log(`${key}: ${value}`);
})

// Task #2

function checkNum (num) {
    let counter = -1

    if (num > 1000 || typeof(num) !== 'number') {
        console.log('Expect Number num < 1000');
        return counter
    } else if (num <= 1) {
        console.log('Entered 0 or 1');
        return counter
    } else {
        counter = 0

        for (let i = 2; i <= num; i++) {
            !(num % i) ? counter++ : null
        }
        if (counter == 1) {
            console.log('Simple');
        } else {
            console.log('Not simple');
        }
    }

    return counter
}

let arr = [2, 3, 5, 1, 11, 13, 0, 19, 4, 29]

arr.forEach(item => { checkNum(item) })

// Task #3
function example(num) {
    const res = (newNum) => newNum + num; 
    retRes = res(num);
    return retRes;
}

console.log(example(5)); 

// Task #4
let getEnter = prompt('Enter two comma separated numbers: ').split(',')

const printNumbersForEverySec = (a, b)=>{
    for (let i = a; i <= b; i++) {
        setTimeout( () =>{
          console.log(i)
        }, i * 1000)
      }
}

printNumbersForEverySec(getEnter[0], getEnter[1]);

// Task #5
const arrowPowFunc = (x, n) => {
    let res = 1

    for (let i = 0; i < n; i++) {
        res *= x
    }

    return res
}

console.log(arrowPowFunc(2,3));




