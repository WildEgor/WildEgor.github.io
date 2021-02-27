


//// Task #2

let JSONResponse = {
	"list": [
	 {
	  "name": "Petr",
	  "age": "20",
	  "prof": "mechanic"
	 },
	 {
	  "name": "Vova",
	  "age": "60",
	  "prof": "pilot"
	 }
	]
}

let tempObject = {
	list: []
}

for (let item in JSONResponse) {
	if (JSONResponse[item].constructor !== Array) {
		tempObject[item] = item
	} else {
		tempObject[item].push(JSONResponse[item])
	}
}

console.log(tempObject);