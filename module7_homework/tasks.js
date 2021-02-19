// Task #1

(function printProps(obj) {
    for (let prop in obj) {
        obj.hasOwnProperty(prop) ? console.log(`Key ${prop}: value ${obj[prop]}`) : '';
    }
}({'myProp': 1}))

// Task #2

function checkPropByName (str, obj) {

    for (const [key, value] of Object.entries(obj)) {
        return str === String(key)
      }
}

console.log(checkPropByName('myProp', {'myProp': 1})); 

// Task #3

const createObj = () => {
    return Object.create(null)
}

console.log(createObj());

// Task #4
// Класс "Прибор" : имя, вкл/выкл, сколько проработал, мощность, потребление всего
function Equipment(name, power) {
    this.name = name,
    this.isPlug = false,
    this.power = power,
    this.powerConsumption = 0,
    this.workHours = 0
}

// Функция для расчета потребления
Equipment.prototype.powerCalc = function (dateFuture = Date.now()) {
    let diffInMilliSeconds = Math.abs(dateFuture - Date.now()) / 1000;
    this.workHours += Math.floor(diffInMilliSeconds / 3600) % 24;
    this.powerConsumption = this.workHours * this.power / 1000
    console.log(`Summary consumption -> ${this.powerConsumption} kW/h, ${this.power} W, ${this.workHours} h`)
}

// Свойство приборов вкл/выкл в сеть
Equipment.prototype.turn = function (futureDate) {
    this.isPlug = !this.isPlug;
    this.isPlug? console.log(`${this.name} Turn On`) : console.log(`${this.name} Turn Off`)
    if (!this.isPlug) 
        this.powerCalc.call(this, futureDate.setHours(Math.floor(Math.random()*10 + 1)))
}

// Класс "Лампа"
function Lamp (name, color, power) {
    Equipment.call(this, name, power)
    this.color = color;
}

// Класс "Компьютер"
function PC (name, model, power) {
    Equipment.call(this, name, power)
    this.model = model
}

Lamp.prototype = Object.create(Equipment.prototype);
PC.prototype = Object.create(Equipment.prototype);

Lamp.prototype.changeColor = function (newColor) {
    let self = this.color
    this.color = newColor;
    console.log(`Color was changed from ${self} to ${this.color}`)
}

let lamp = new Lamp('Lamp', 'red', 50)
let pc = new PC('PC', 'gaming', 500)

lamp.turn();
pc.turn();

lamp.changeColor('white');

lamp.turn(new Date());
pc.turn(new Date());

// Task #5
class Equip {
    constructor (name, power) {
        this.name = name;
        this.power = power;
        this.isPlug = false;
        this.workHours = 0;
        this.powerConsumption = 0;
    }

    powerConsumptionCalc (dateFuture = Date.now()) {
        let diffInMilliSeconds = Math.abs(dateFuture - Date.now()) / 1000;
        this.workHours += Math.floor(diffInMilliSeconds / 3600) % 24;
        this.powerConsumption = this.workHours * this.power / 1000
        return this
    }

    turn (futureDate) {
        this.isPlug = !this.isPlug;
        if (!this.isPlug) 
            this.powerConsumptionCalc.call(this, futureDate.setHours(Math.floor(Math.random()*10 + 1)))
        return this
    }

    getPlagInStatus () {
        this.isPlug? console.log(`${this.name} Turn On`) : console.log(`${this.name} Turn Off`)
        return this
    }

    getPowerConsumptionInfo () {
        console.log(`${this.name} - summary power consumption info -> ${this.powerConsumption} kW/h, ${this.power} W, ${this.workHours} h`)
        return this
    }
}

class EcoLamp extends Equip {
    constructor (name, color, power) {
        super(name, power)
        this.color = color
        this.brightness = 0
    }

    setBrightness (level = 100) {
        this.brightness = level
    }

    getBrightness () {
        return this.brightness
    }
}

class Computer extends Equip {
    constructor (name, model, power) {
        super(name, power)
        this.model = model
    }
}

let newLamp = new EcoLamp('EcoLamp', 'white', 10)
let newPc = new Computer('Computer', 'working', 250)

newLamp.turn();
newLamp.setBrightness(90)
console.log(`Current brightness is ${newLamp.getBrightness()}`)
newPc.turn();

newLamp.getPlagInStatus()
newPc.getPlagInStatus()

newLamp.turn(new Date());
newPc.turn(new Date());

newLamp.getPowerConsumptionInfo()
newPc.getPowerConsumptionInfo()










