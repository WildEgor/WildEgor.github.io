//// Task #1

// (function printProps(obj) {
//     for (let prop in obj) {
//         obj.hasOwnProperty(prop) ? console.log(`Key ${prop}: value ${obj[prop]}`) : '';
//     }
// }({'myProp': 1}))

//// Task #2

// function checkPropByName (str, obj) {

//     for (const [key, value] of Object.entries(obj)) {
//         return str === String(key)
//       }
// }

// console.log(checkPropByName('myProp', {'myProp': 1})); 

//// Task #3

// const createObj = () => {
//     return Object.create(null)
// }

// console.log(createObj());

//// Task #4

// // Класс "Прибор" : имя, вкл/выкл, сколько проработал, мощность, потребление всего и функция для расчета потребления
// function Equipment(name, power) {
//     this.name = name,
//     this.isPlug = false,
//     this.workHours = 0,
//     this.power = power || 100,
//     this.powerConsumption = 0,
//     this.powerCalc = function (dateFuture = Date.now()) {
//         let diffInMilliSeconds = Math.abs(dateFuture - Date.now()) / 1000;
//         this.workHours += Math.floor(diffInMilliSeconds / 3600) % 24;
//         this.powerConsumption = this.workHours * this.power
//     }
// }

// // Свойство приборов вкл/выкл в сеть
// Equipment.prototype.turn = function (futureDate) {
//     this.isPlug = !this.isPlug;

//     if (!this.isPlug) {
//         this.powerCalc.call(this, futureDate)
//     }
// }

// // Класс "Лампа"
// function Lamp (name, color) {
//     Equipment.call(this, name);
//     this.color = color;
// }

// // Класс "Компьютер"
// function PC (name, model) {
//     Equipment.call(this, name);
//     this.model = model,
//     this.isLighting = false
// }

// Lamp.prototype = Object.create(Equipment.prototype);
// PC.prototype = Object.create(Equipment.prototype);

// let lamp = new Lamp('Lamp', 'red')
// let pc = new PC('PC', 'gaming')

// lamp.power = 50;
// pc.power = 500;

// console.log(lamp.power)
// console.log(pc.power)

// let lampFutureDate = new Date();
// lampFutureDate.setHours(20);

// lamp.turn();
// pc.turn();

// console.log(lamp.isPlug)
// console.log(pc.isPlug)

// lamp.turn(lampFutureDate);
// pc.turn(lampFutureDate);

// console.log(lamp.workHours)
// console.log(pc.workHours)
// console.log(lamp.powerConsumption)
// console.log(pc.powerConsumption)

//// Task #5

class Equip {
    constructor () {

    }
}

class Lamp extends Equip {
    constructor () {

    }
}

class PC extends Equip {
    constructor () {
        
    }
}










