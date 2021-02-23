
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

const form = document.querySelector('#f_form');

const formWarning = form.querySelector('.forma__warning')
const requestInput = form.querySelector('#f_number')
const formButton = form.querySelector('.forma__button')

const baseURL = 'https://picsum.photos/v2/list'
const url = new URL(baseURL);
const xhr = new XMLHttpRequest();
xhr.timeout = 1000;

// Used to add a numeric id on slide creation to let us target the element later  
var slideIndex = 0;
// Tells us which slide we are on
var currentSlideIndex = 0;
// An Array to hold all the slides
var slideArray = [];

function SliderClass () {
	
}

// Template for creating a custom Slide object
function Slide (title, subtitle, background, link ) {
	this.title = title;
	this.subtitle = subtitle;
	this.background = background;
	this.link = link;
	// we need an id to target later using getElementById
	this.id = "slide" + slideIndex;
	// Add one to the index for the next slide number
	slideIndex++;
	// Add this Slide to our array
	slideArray.push(this);
}

// Navigates to the previous slide in the list
function prevSlide(){
	// Figure out what the previous slide is
	var nextSlideIndex;
	// If we are at zero go to the last slide in the list
	if (currentSlideIndex === 0 ) {
		nextSlideIndex = slideArray.length - 1;
	} else {
		// Otherwise the next one is this slide minus 1
		nextSlideIndex = currentSlideIndex - 1;
	}	

	console.log(nextSlideIndex);
	console.log(currentSlideIndex);
	
	// Setup the next slide and current slide for animations
	document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
	document.getElementById("slide" + currentSlideIndex).style.left = 0;
	
	// Add the appropriate animation class to the slide
	document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
	document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");
	
	// Set current slide to the new current slide
	currentSlideIndex = nextSlideIndex;
}

// Navigates to the next slide in the list
function nextSlide(){
	// Figure out what the next slide is
	var nextSlideIndex;
	// If we are at the last slide the next one is the first (zero based)
	if (currentSlideIndex === (slideArray.length - 1) ) {
		nextSlideIndex = 0;
	} else {
		// Otherwise the next slide is the current one plus 1
		nextSlideIndex = currentSlideIndex + 1;
	}	

	console.log(nextSlideIndex);
	console.log(currentSlideIndex);
	
	// Setup the next slide and current slide for animations
	document.getElementById("slide" + nextSlideIndex).style.left = "100%";
	document.getElementById("slide" + currentSlideIndex).style.left = 0;
	
	// Add the appropriate animation class to the slide
	document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
	document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");
	
	// Set current slide to the new current slide
	currentSlideIndex = nextSlideIndex;
}

function buildSlider(){
	// A variable to hold all our HTML
	var myHTML;
	
	// Go through the Array and add the code to our HTML
	for(var i = 0; i < slideArray.length; i++) {
		
		myHTML += "<div id='" + slideArray[i].id + 
		"' class='singleSlide' style='background-image:url(" + slideArray[i].background + ");'>" + 
		"<div class='slideOverlay'>" + 
		"<h1>" + slideArray[i].title + "</h1>" +
		"<h4>" + slideArray[i].subtitle + "</h4>" +
		"<a href='" + slideArray[i].link + "' target='_blank'>Open Link</a>" +
		"</div>" +
		"</div>";	
		
	}

	document.querySelector('#sliderPrev').addEventListener('click', prevSlide)
	document.querySelector('#sliderNext').addEventListener('click', nextSlide)
	
	// Print our HTML to the web page
	document.getElementById("mySlider").innerHTML = myHTML;
		
	// Display the first slide
	document.getElementById("slide" + currentSlideIndex).style.left = 0;

}

const parseResponse = (resp) => {
	const res = JSON.parse(resp)

	console.log(res);
	slideArray = []

	for (let item of res) {
		new Slide( item.author, "New Slide", item.download_url, item.url )
	}
	
	// Create our slider
	buildSlider();

	console.log(slideArray);
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
