//// Task #1
const XMLParser = new DOMParser()

const xmlObj = {
    list: [

    ]
}

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`

class XMLDomParser {
	
	constructor (xml) {
		this.xml = xml
	}
	
	parse (xml) {
		const parser = new DOMParser()
		const dom = parser.parseFromString(this.xml, "application/xml")
		return this.convertNodes(dom)		
	}
	
	/*
	** Recursively go through the node tree and convert each node to an object property
	** @params DOM Node
	** @return {Object}
	*/
	convertNodes (node) {
		let tempObject = {}
		let textContent = ""
		
		for (let item of node.childNodes) {
			let nodeName = item.nodeName.toLowerCase()
			let nodeType = item.nodeType
			
			// Element Node
			if (nodeType === 1) {
				let nodeContent = this.convertNodes(item)					
				if (tempObject.hasOwnProperty(nodeName)) {
					if (tempObject[nodeName].constructor !== Array) { 
						tempObject[nodeName] = [tempObject[nodeName]]
					}
					tempObject[nodeName].push(nodeContent)
				} else {
					tempObject[nodeName] = nodeContent
				}
			}
			
			// Text Node
			if (nodeType === 3) {
				textContent = item.nodeValue.trim()
			}
			
			if (textContent) {
				tempObject = textContent
			}
		}

		
		return tempObject
	}
}

window.addEventListener('load', () => {
	const xmlParser = new XMLDomParser(xmlString)
	const parsedXml = JSON.stringify(xmlParser.parse(), null, 4)
	console.log(parsedXml);
})

