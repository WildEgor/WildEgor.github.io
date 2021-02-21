//// Task #1

// const xmlString = `
// <list>
//   <student>
//     <name lang="en">
//       <first>Ivan</first>
//       <second>Ivanov</second>
//     </name>
//     <age>35</age>
//     <prof>teacher</prof>
//   </student>
//   <student>
//     <name lang="ru">
//       <first>Петр</first>
//       <second>Петров</second>
//     </name>
//     <age>58</age>
//     <prof>driver</prof>
//   </student>
// </list>
// `

// class XMLDomParser {
	
// 	constructor (xml) {
// 		this.xml = xml
// 	}
	
// 	parse (options) {
// 		const parser = new DOMParser()
// 		const dom = parser.parseFromString(this.xml, "application/xml")
// 		return this.convertNodes(dom, options)		
// 	}
	
// 	convertNodes (node, options) {
// 		let tempObject = {}
// 		let textContent = ""
		
// 		for (let item of node.childNodes) {
// 			let nodeName = item.nodeName.toLowerCase()
// 			let nodeType = item.nodeType
			
// 			// Element Node
// 			if (nodeType === 1) {
// 				let nodeContent = this.convertNodes(item, options)	

// 				if (nodeName === options.specialNodeName && nodeContent instanceof Object) {
// 					tempObject[options.specialNodeName] = this.simplifyObj(nodeContent).join(' ')
// 				} else {
// 					if (tempObject.hasOwnProperty(nodeName)) {
// 						if (tempObject[nodeName].constructor !== Array) { 
// 							tempObject[nodeName] = [tempObject[nodeName]]
// 						}
// 						tempObject[nodeName].push(nodeContent)
// 					} else {
// 						tempObject[nodeName] = nodeContent
// 					}
// 				}			
// 			}
			
// 			// Text Node
// 			if (nodeType === 3) {
// 				textContent = item.nodeValue.trim()
// 			}

// 			if (textContent) {
// 				tempObject = textContent
// 			}

// 			// Attributes
// 			if (item.attributes && item.attributes.length > 0) {
// 				let temp = {}
// 				for(let i = 0; i < item.attributes.length; i++) {
// 					let attribute = item.attributes.item(i);
//                 	temp[attribute.nodeName] = attribute.nodeValue;
// 				}
// 				Object.assign(tempObject, temp)
// 			}
// 		}
// 		return tempObject
// 	}

// 	simplifyObj (newObj) {
// 		return Object.values(newObj)
// 	}
// }

// window.addEventListener('load', () => {
// 	let opt = { specialNodeName: "name" }
// 	const xmlParser = new XMLDomParser(xmlString)
// 	const parsedXml = JSON.stringify(xmlParser.parse(opt), null, 4)
// 	console.log(parsedXml);
// })


// //// Task #2

// let JSONResponse = {
// 	"list": [
// 	 {
// 	  "name": "Petr",
// 	  "age": "20",
// 	  "prof": "mechanic"
// 	 },
// 	 {
// 	  "name": "Vova",
// 	  "age": "60",
// 	  "prof": "pilot"
// 	 }
// 	]
// }

// let tempObject = {
// 	list: []
// }

// for (let item in JSONResponse) {
// 	if (JSONResponse[item].constructor !== Array) {
// 		tempObject[item] = item
// 	} else {
// 		tempObject[item].push(JSONResponse[item])
// 	}
// }

// console.log(tempObject);

//// Task #3

const slider = document.querySelector('#imagesAutoSlider')

const form = document.querySelector('#f_form');

const formWarning = form.querySelector('.forma__warning')
const requestInput = form.querySelector('#f_number')
const formButton = form.querySelector('.forma__button')

const baseURL = 'https://picsum.photos/v2/list'
const url = new URL(baseURL);
const xhr = new XMLHttpRequest();
xhr.timeout = 1000;

const parseResponse = (resp) => {
	const res = JSON.parse(resp)
	console.log(res);

	slider.innerHTML = ''
	
	res.forEach(item => {
		slider.innerHTML += `
		<img src="${item.download_url}">
		`
	})
}

xhr.onload = function() {
	// console.log(`Загружено: ${xhr.status} ${xhr.response}`);
	parseResponse(xhr.response)
};
  
xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
	// console.log(`Ошибка соединения`);
};
  
xhr.onprogress = function(event) { // запускается периодически
// event.loaded - количество загруженных байт
// event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
// event.total - количество байт всего (только если lengthComputable равно true)
	// console.log(`Загружено ${event.loaded} из ${event.total}`);
};

requestSubmit = (e) => {
	e.preventDefault();
	url.searchParams.set('limit', requestInput.value);
	console.log(url);
	xhr.open('GET', url, [true])
	xhr.send()
}

requestInput.addEventListener('change', (e) => {
	const inputVal = e.target.value
	console.log(`object`);
	if (inputVal >= 1 && inputVal <= 10) {
		formWarning.style.display = 'none'
		formButton.disabled = false;
	} else {
		formWarning.style.display = 'block'
		formWarning.textContent = `Enter valid number`;
		formButton.disabled = true;
	}
})

form.addEventListener('submit', requestSubmit);
